# 08 — Structured output

## Goal

Receive predictable property fields.

## Concepts

JSON Schema; text.format; parsing; refusals.

## Before you start

Complete the earlier lessons first. Write your own implementation in the empty practice.js; you may reuse code you wrote earlier. Use gpt-4.1 and disable SDK retries with maxRetries 0. Keep each API request a deliberate manual action.

## Implementation steps

1. Design an object with title and description as strings, and highlights as an array of strings.
2. Configure Responses text.format as json_schema with a name, strict enabled, and your schema. Require every declared field and disallow additional properties.
3. Request content from the fictional facts. Check completion and refusal content before parsing response.output_text as JSON.
4. Print the parsed fields with clear labels; handle parse failures.

## Run from the project root

~~~powershell
node --env-file=.env lessons/08-structured-output/practice.js
~~~

## Experiments

- Change the audience while preserving the schema.
- Use a very small output budget in a separate run and observe how your incomplete-response handling behaves.

Run each variation separately. Record the changed setting and result in [observations](../../notes/observations.md).

## Reflection

- Does matching a schema guarantee the property claims are true?
- Why should incomplete text not be parsed as a successful result?

## Completion checklist

- [ ] A completed response can be parsed into your chosen fields.
- [ ] Incomplete responses and refusals are handled without treating them as valid property data.

Judge behavior and facts rather than expecting an exact generated sentence.

## Reference

[Official OpenAI documentation](https://developers.openai.com/api/docs/guides/structured-outputs) — use the JavaScript examples and Responses API sections as reference, then write your own implementation.

[Course index](../../README.md)

