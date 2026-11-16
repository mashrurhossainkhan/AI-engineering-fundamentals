// Streaming prints the answer as it arrives instead of waiting for all of it.
// Node.js includes fetch, so this lesson needs no additional package.

// Gemini sends Server-Sent Events (SSE): data lines separated by a blank line.
// Network chunks can split an event anywhere, so keep unfinished lines buffered.
async function* readEvents(body) {
  const decoder = new TextDecoder();
  let buffer = '';
  let dataLines = [];

  function readLine(line) {
    if (line.endsWith('\r')) line = line.slice(0, -1);
    if (line === '') {
      const data = dataLines.join('\n');
      dataLines = [];
      return data;
    }
    if (line.startsWith('data:')) {
      dataLines.push(line.slice(5).replace(/^ /, ''));
    }
    return null;
  }

  for await (const chunk of body) {
    buffer += decoder.decode(chunk, { stream: true });
    let newline;
    while ((newline = buffer.indexOf('\n')) !== -1) {
      const data = readLine(buffer.slice(0, newline));
      buffer = buffer.slice(newline + 1);
      if (data) yield data;
    }
  }

  buffer += decoder.decode();
  if (buffer) readLine(buffer);
  if (dataLines.length) yield dataLines.join('\n');
}

async function main() {
  let printedText = false;

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error(
        'Add GEMINI_API_KEY to .env and run with --env-file=.env',
      );
    }

    const model = process.env.GEMINI_MODEL || 'gemini-3.8-flash';
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:streamGenerateContent?alt=sse`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: 'Explain Docker in 3 sentences.' }],
            },
          ],
        }),
        // Stop waiting if the whole request takes more than two minutes.
        signal: AbortSignal.timeout(120_000),
      },
    );

    // fetch does not throw for HTTP errors, so check the status ourselves.
    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      const hints = {
        400: 'Check your API key and request settings.',
        403: 'Check API key permissions and access to this model.',
        404: 'Check GEMINI_MODEL in .env; the model may be unavailable.',
        429: 'Rate limit or quota reached. Check your quota before trying again.',
        503: 'Gemini is temporarily unavailable. Try again later.',
      };
      throw new Error(
        `Gemini API error (${response.status}): ${errorBody?.error?.message || response.statusText}. ${hints[response.status] || ''}`,
      );
    }
    if (!response.body) throw new Error('Gemini returned no response stream.');

    let finishReason;
    for await (const event of readEvents(response.body)) {
      if (event === '[DONE]') break;
      const data = JSON.parse(event);
      // Errors can also arrive after streaming has already started.
      if (data.error)
        throw new Error(data.error.message || 'Gemini stream failed.');
      if (data.promptFeedback?.blockReason) {
        throw new Error(`Prompt blocked: ${data.promptFeedback.blockReason}`);
      }

      const candidate = data.candidates?.[0];
      if (candidate?.finishReason) finishReason = candidate.finishReason;
      for (const part of candidate?.content?.parts || []) {
        // Print only the answer, excluding any internal thinking parts.
        if (part.text && !part.thought) {
          process.stdout.write(part.text);
          printedText = true;
        }
      }
    }

    const hadAnswer = printedText;
    if (printedText) process.stdout.write('\n');
    printedText = false;
    if (!finishReason)
      throw new Error(
        'The stream ended without a completion status; the answer may be incomplete.',
      );
    if (finishReason !== 'STOP') {
      throw new Error(
        `Generation ended with ${finishReason}; the answer may be incomplete or blocked.`,
      );
    }
    if (!hadAnswer)
      throw new Error('Gemini completed without returning answer text.');
  } catch (error) {
    // Put errors on a new line if part of an answer has already been printed.
    if (printedText) process.stdout.write('\n');
    if (error.name === 'TimeoutError') {
      console.error('LLM request failed: The request timed out. Try again.');
    } else {
      console.error('LLM request failed:', error.message);
    }
    // Tell the terminal that the script failed without hiding the error.
    process.exitCode = 1;
  }
}

await main();

/*

import "dotenv/config";
import OpenAI from "openai";

const client = new OpenAI();

async function main() {
  try {
    const stream = await client.responses.create({
      model: "gpt-4.1-mini",
      input: "Explain Docker in 3 sentences.",
      stream: true
    });

    for await (const event of stream) {
      if (event.type === "response.output_text.delta") {
        process.stdout.write(event.delta);
      }
    }
  } catch (error) {
    console.error("LLM request failed:", error.message);
  }
}

main();

*/
