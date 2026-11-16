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
      // System instructions define how the assistant should behave.
      systemInstruction: {
        parts: [{ text: 'You are a property management assistant.' }],
      },
      // Gemini uses 'model' for previous assistant messages.
      contents: [
        {
          role: 'user',
          parts: [{ text: 'Find 2-bedroom apartments in Melbourne.' }],
        },
        {
          role: 'model',
          parts: [{ text: 'I can help you search for apartments.' }],
        },
        {
          role: 'user',
          parts: [{ text: 'Only under $600 per week.' }],
        },
      ],
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

import "dotenv/config";
import OpenAI from "openai";

const client = new OpenAI();

const response = await client.responses.create({
  model: "gpt-4.1-mini",
  instructions: "You are a property management assistant.",
  input: [
    {
      role: "user",
      content: "Find 2-bedroom apartments in Melbourne."
    },
    {
      role: "assistant",
      content: "I can help you search for apartments."
    },
    {
      role: "user",
      content: "Only under $600 per week."
    }
  ]
});

console.log(response.output_text);

*/
