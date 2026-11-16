const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('Add GEMINI_API_KEY to .env and run with --env-file=.env');
}

// Node.js includes fetch, so no additional package is needed.
const model = process.env.GEMINI_MODEL || 'gemini-3.8-flash';
const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey,
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: 'Explain AWS EC2 in one sentence' }] }],
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

console.log(text);

/*
1. Your Node.js backend sends the prompt.
2. The LLM API processes it.
3. The LLM generates a response.
4. Your backend receives the generated text.
gpt example using the OpenAI Node.js client:
const response = await client.responses.create({
  model: "gpt-4.1",
  input: "Explain AWS EC2 in one sentence"
});

console.log(response.output_text);
*/
