const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('Add GEMINI_API_KEY to .env and run with --env-file=.env');
}

// Node.js includes fetch, so no additional package is needed.
const model = process.env.GEMINI_MODEL || 'gemini-3.8-flash';
// Try 0.2, 1.0, and 1.8, running the same prompt several times.
// Lower values usually give more predictable wording; higher values add variety.
const temperature = 1.8;
const prompt =
  'Write a two-sentence to get into software engineering industry in this AI era.';

const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey,
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature,
        maxOutputTokens: 500,
      },
    }),
  },
);

const data = await response.json();

if (!response.ok) {
  throw new Error(
    `Gemini API error (${response.status}): ${data.error?.message || response.statusText}`,
  );
}

const text = data.candidates?.[0]?.content?.parts
  ?.filter((part) => !part.thought)
  .map((part) => part.text || '')
  .join('');

if (!text) {
  throw new Error(
    'Gemini returned no text. Try a different prompt or check your model settings.',
  );
}

console.log(`Temperature: ${temperature}\n`);
console.log(text);

/*
const response = await client.responses.create({
  model: "gpt-4.1",
  input: "Write a property description",
  temperature: 0.2,
  max_output_tokens: 150
});

console.log(response.output_text);
*/
