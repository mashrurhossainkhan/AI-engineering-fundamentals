import { config } from 'dotenv';
import express from 'express';

// Load this project's .env even when Node is started from another folder.
config({ path: new URL('./.env', import.meta.url), quiet: true });

const apiKey = process.env.GEMINI_API_KEY;
const model = process.env.GEMINI_MODEL || 'gemini-3.8-flash';
const port = Number(process.env.PORT || 3000);

if (!apiKey) {
  throw new Error('Add GEMINI_API_KEY to propertyflow-ai/.env before starting the server.');
}
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT must be an integer between 1 and 65535.');
}

const app = express();
app.use(express.json({ limit: '10kb' }));

app.post('/api/chat', async (req, res) => {
  const { message } = req.body ?? {};

  if (typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'A valid message is required' });
  }

  try {
    // Send the user's message to Gemini. No additional AI SDK is needed.
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: 'You are a helpful property management assistant. You have no access to live property listings or a database. Do not invent listings or claim to perform actions.' }],
          },
          contents: [{ role: 'user', parts: [{ text: message.trim() }] }],
        }),
        signal: AbortSignal.timeout(120_000),
      },
    );

    const data = await response.json();
    if (!response.ok) {
      // Return useful messages for quota limits and temporary high demand.
      // Do not send API credentials or raw provider error details to the browser.
      console.error('Gemini API status:', response.status);
      const status = response.status === 429 ? 429 : response.status === 503 ? 503 : 502;
      const error = status === 429
        ? 'AI rate limit or quota reached. Please try again later.'
        : status === 503
          ? 'The AI model is busy. Please try again later.'
          : 'Unable to generate a response';
      return res.status(status).json({ error });
    }

    const answer = data.candidates?.[0]?.content?.parts
      ?.filter((part) => !part.thought)
      .map((part) => part.text || '')
      .join('');

    if (!answer) {
      return res.status(502).json({ error: 'The AI returned no answer. Try rephrasing your message.' });
    }

    return res.json({ answer });
  } catch (error) {
    const timedOut = error.name === 'TimeoutError';
    console.error('AI request failed:', error.name);
    return res.status(timedOut ? 504 : 502).json({
      error: timedOut ? 'The AI request timed out. Please try again.' : 'Unable to generate a response',
    });
  }
});

// Return JSON for invalid or oversized request bodies as well.
app.use((error, req, res, next) => {
  if (error.type === 'entity.too.large') {
    return res.status(413).json({ error: 'Request body is too large' });
  }
  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Request body must be valid JSON' });
  }
  console.error('Request failed:', error.name);
  return res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
