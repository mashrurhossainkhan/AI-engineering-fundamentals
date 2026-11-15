# 05 — Response inspection

## Goal

Understand the response beyond its displayed text.

## Concepts

Response object; output items; usage.

## Before you start

Complete the earlier lessons first. Write your own implementation in the empty practice.js; you may reuse code you wrote earlier. Use gpt-4.1 and disable SDK retries with maxRetries 0. Keep each API request a deliberate manual action.

## Implementation steps

1. Send one familiar request.
2. Inspect id, model, status, output, output_text, and usage using labeled console output.
3. Compare the convenient text field with the underlying output items. Inspect input_tokens, output_tokens, and total_tokens when usage is present.

## Run from the project root

~~~powershell
node --env-file=.env lessons/05-response-inspection/practice.js
~~~

## Experiments

- Increase the input with more fictional facts and compare usage in a separate run.

Run each variation separately. Record the changed setting and result in [observations](../../notes/observations.md).

## Reflection

- What would your display do if output_text were empty?
- Which usage values changed with the longer input?

## Completion checklist

- [ ] You can locate generated text and usage in an actual response.
- [ ] You handle absent fields without crashing.

Judge behavior and facts rather than expecting an exact generated sentence.

## Reference

[Official OpenAI documentation](https://developers.openai.com/api/reference/resources/responses/methods/create) — use the JavaScript examples and Responses API sections as reference, then write your own implementation.

[Course index](../../README.md)

