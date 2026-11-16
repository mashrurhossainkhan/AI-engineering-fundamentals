/*
ASSUMPTION FOR THIS LESSON:
Imagine a MySQL table named property with these columns:
  property(id, name, city, bedrooms, weeklyrent)
weeklyrent stores the weekly rent in Australian dollars.
This script only extracts search filters; it does not connect to MySQL.
city and bedrooms map directly to table columns.
maxWeeklyRent is a search limit applied to the weeklyrent column.
*/

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
      systemInstruction: {
        parts: [
          {
            text: 'Extract property search filters from the user request. Rent is weekly in Australian dollars.',
          },
        ],
      },
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: 'Find 2-bedroom apartments in Melbourne under $600 per week',
            },
          ],
        },
      ],
      generationConfig: {
        responseMimeType: 'application/json',
        responseJsonSchema: {
          type: 'object',
          properties: {
            city: { type: 'string' },
            bedrooms: { type: 'integer', minimum: 0 },
            maxWeeklyRent: { type: 'integer', minimum: 0 },
          },
          required: ['city', 'bedrooms', 'maxWeeklyRent'],
          additionalProperties: false,
        },
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

const filters = JSON.parse(text);
console.log(filters); //{ city: 'Melbourne', bedrooms: 2, maxWeeklyRent: 600 }

/*
Example extracted filters:
  { city: 'Melbourne', bedrooms: 2, maxWeeklyRent: 600 }

Gemini turns the user's sentence into separate values our code can use.
These values describe what the user wants; they are not property listings.
To find actual listings, our app would search the assumed MySQL table.

A future MySQL integration could use this parameterized query:
  SELECT id, name, city, bedrooms, weeklyrent
  FROM property
  WHERE city = ? AND bedrooms = ? AND weeklyrent < ?

Parameters: [filters.city, filters.bedrooms, filters.maxWeeklyRent]

What this means in plain English:
- SELECT chooses which details to return for each matching property:
  its ID, name, city, number of bedrooms, and weekly rent.
- FROM property tells MySQL which table to search.
- WHERE lists the conditions a property must meet.
- AND means all three conditions must be true for the same property.
- Each ? is a placeholder for a value supplied separately by our code.
  A MySQL driver would match the parameters to the ? marks in order:
  first 'Melbourne', then 2, then 600.
- city = ? means the property must be in Melbourne.
- bedrooms = ? means it must have exactly 2 bedrooms.
- weeklyrent < ? means its weekly rent must be less than $600.
  A property costing exactly $600 would not match. Use <= for "$600 or less".

Why supply parameters separately?
The SQL defines the search, while the parameters provide the search values.
Using a driver's parameter binding avoids building SQL by joining user text
into the query, helping prevent that text from being treated as SQL commands.

Gemini extracts the filters; MySQL would find the matching property rows.
The query is an illustration only; it is not executed by this script.
*/
