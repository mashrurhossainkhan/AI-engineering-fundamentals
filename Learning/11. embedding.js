// Run from AI-engineering-fundamentals:
// node --env-file=.env "Learning/11. embedding.js"
// Node.js includes fetch, so no additional package is needed.

// An embedding represents text as a list of numbers called a vector.
// Comparing vectors can help find texts with similar meanings.
// This lesson creates one vector; it does not search or store anything.
const input = 'My kitchen tap is leaking';

async function main() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('Add GEMINI_API_KEY to .env and run with --env-file=.env');
    }

    // Embedding models produce numbers; chat models produce generated answers.
    // Use a separate setting so GEMINI_MODEL can remain your chat model.
    const model = process.env.GEMINI_EMBEDDING_MODEL || 'gemini-embedding-001';
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:embedContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          content: { parts: [{ text: input }] },
        }),
        // Stop waiting if the request takes more than two minutes.
        signal: AbortSignal.timeout(120_000),
      },
    );

    // fetch does not throw for HTTP errors, so check the status ourselves.
    if (!response.ok) {
      const hints = {
        400: 'Check the input, API key, and embedding model settings.',
        403: 'Check API key permissions and model access.',
        404: 'Check GEMINI_EMBEDDING_MODEL; the model may be unavailable.',
        429: 'Rate limit or quota reached. Check your allowance before retrying.',
        503: 'The model is temporarily busy. Try again later.',
      };
      // Avoid printing credentials or the raw provider response.
      await response.body?.cancel();
      throw new Error(`Gemini API error (${response.status}). ${hints[response.status] || 'Try again later or check your API settings.'}`);
    }

    const data = await response.json();
    const vector = data.embedding?.values;
    if (!Array.isArray(vector) || vector.length === 0 || !vector.every(Number.isFinite)) {
      throw new Error('Gemini returned a missing or invalid embedding vector.');
    }

    // Show only the first five numbers as a preview of the full vector.
    console.log(vector.slice(0, 5));
    // Dimensions means how many numbers are in the vector, not words or tokens.
    // We use the model's default dimensions and count the values actually returned.
    console.log('Dimensions:', vector.length);
  } catch (error) {
    if (error.name === 'TimeoutError') {
      console.error('Embedding request failed: The request exceeded the 120-second timeout. Try again later.');
    } else {
      console.error('Embedding request failed:', error.message);
    }
    process.exitCode = 1;
  }
}

await main();
