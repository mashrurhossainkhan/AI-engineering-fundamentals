const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('Add GEMINI_API_KEY to .env and run with --env-file=.env');
}

const model = process.env.GEMINI_MODEL || 'gemini-3.8-flash';

function getPropertyRent(propertyId) {
  // ASSUMPTION: Property 102 costs $620 per week.
  // This is sample data for learning, not a real database lookup.
  // A future version could query property(id, name, city, bedrooms, weeklyrent).
  if (propertyId !== 102) {
    return {
      error: `Property ${propertyId} was not found in the sample data.`,
    };
  }

  return { propertyId, weeklyRent: 620, currency: 'AUD' };
}

// This description tells Gemini what our tool does and what input it needs.
// It does not send the JavaScript function itself to Gemini.
const tools = [
  {
    functionDeclarations: [
      {
        name: 'getPropertyRent',
        description: 'Get the weekly rent of a property using its ID.',
        parameters: {
          type: 'object',
          properties: {
            propertyId: {
              type: 'integer',
              description: 'The ID of the property.',
            },
          },
          required: ['propertyId'],
        },
      },
    ],
  },
];

const contents = [
  {
    role: 'user',
    parts: [{ text: "What's the rent for Property 102?" }],
  },
];

async function askGemini() {
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
          parts: [
            {
              text: 'Use getPropertyRent to look up rent. Answer using the tool result; do not invent rent values.',
            },
          ],
        },
        contents,
        tools,
      }),
    },
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(
      `Gemini API error (${response.status}): ${data.error?.message || response.statusText}`,
    );
  }

  const content = data.candidates?.[0]?.content;
  if (!content?.parts?.length) {
    throw new Error(
      'Gemini returned no content. Check the prompt or model settings.',
    );
  }
  return content;
}

// Gemini asks to use a tool; our JavaScript runs it and sends back the result.
// Repeat if needed, with a limit to prevent endless API requests.
let completed = false;
for (let turn = 0; turn < 5; turn++) {
  const modelContent = await askGemini();
  const calls = modelContent.parts.filter((part) => part.functionCall);

  if (calls.length === 0) {
    const text = modelContent.parts
      .filter((part) => !part.thought)
      .map((part) => part.text || '')
      .join('');
    if (!text) throw new Error('Gemini returned no final answer.');
    console.log(text);
    completed = true;
    break;
  }

  // Keep the whole model reply, including metadata Gemini needs on the next turn.
  contents.push(modelContent);
  const results = [];

  for (const { functionCall: call } of calls) {
    // Only run the function we explicitly support. Validate its input as well.
    let result;
    if (call.name !== 'getPropertyRent') {
      result = { error: `Unknown tool: ${call.name}` };
    } else if (
      !Number.isInteger(call.args?.propertyId) ||
      call.args.propertyId <= 0
    ) {
      result = { error: 'propertyId must be a positive integer.' };
    } else {
      console.log('Tool requested:', call.name, call.args);
      result = getPropertyRent(call.args.propertyId);
      console.log('Tool result:', result);
    }

    results.push({
      functionResponse: {
        name: call.name,
        ...(call.id ? { id: call.id } : {}),
        response: result,
      },
    });
  }

  // The tool result becomes part of the conversation so Gemini can explain it.
  contents.push({ role: 'user', parts: results });
}

if (!completed) {
  throw new Error('Stopped after 5 requests without a final answer.');
}
