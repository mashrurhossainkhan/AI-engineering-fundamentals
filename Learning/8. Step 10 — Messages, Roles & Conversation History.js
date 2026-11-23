// Run from AI-engineering-fundamentals with:
// node --env-file=.env "Learning/8. Step 10 — Messages, Roles & Conversation History.js"
// Node.js includes fetch, so no additional package is needed.

async function main() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error(
        'Add GEMINI_API_KEY to .env and run with --env-file=.env',
      );
    }

    const model = process.env.GEMINI_MODEL || 'gemini-3.8-flash';

    // We send earlier messages along with the latest question.
    // This lets Gemini connect "Only under $600" to the Melbourne apartment request.
    // Nothing is saved between script runs; we supply this history each time.
    const contents = [
      {
        // "user" means a message from the person using the app.
        role: 'user',
        parts: [{ text: 'Find 2-bedroom apartments in Melbourne.' }],
      },
      {
        // Gemini calls the assistant's role "model".
        // This is a predefined sample reply, not a reply generated in this run.
        role: 'model',
        parts: [{ text: 'I can help you search for apartments.' }],
      },
      {
        role: 'user',
        parts: [{ text: 'Only under $600 per week.' }],
      },
    ];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          // System instructions describe how the assistant should behave.
          // They are separate from the user/model conversation messages.
          systemInstruction: {
            parts: [
              {
                text: 'You are a property management assistant. Acknowledge the search criteria from the conversation. You have no access to live property listings or a database, so do not invent listings or claim to search them.',
              },
            ],
          },
          contents,
        }),
        signal: AbortSignal.timeout(120_000),
      },
    );

    // fetch does not throw for HTTP errors such as 429 or 503.
    if (!response.ok) {
      const hints = {
        400: 'Check the request settings and API key.',
        403: 'Check API key permissions and model access.',
        404: 'Check GEMINI_MODEL in .env; the model may be unavailable.',
        429: 'Rate limit or quota reached. Check your allowance before retrying.',
        503: 'The model is temporarily busy. Try again later.',
      };
      // Avoid printing credentials or the raw provider response.
      await response.body?.cancel();
      throw new Error(
        `Gemini API error (${response.status}). ${response.status} || 'Try again later or check your API settings.'}`,
      );
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts
      ?.filter((part) => !part.thought)
      .map((part) => part.text || '')
      .join('');

    if (!text?.trim()) {
      throw new Error(
        'Gemini returned no answer text. Try rephrasing your message or check your model settings.',
      );
    }

    console.log(text);
  } catch (error) {
    if (error.name === 'TimeoutError') {
      console.error(
        'LLM request failed: The request exceeded the 120-second timeout. Try again later.',
      );
    } else {
      console.error('LLM request failed:', error.message);
    }
    process.exitCode = 1;
  }
}

await main();
