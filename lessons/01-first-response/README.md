# 01 — First response

## Goal

Send your first property-description request.

## Concepts

Client initialization; async requests; request options; output_text.

## Before you start

Complete the earlier lessons first. Write your own implementation in the empty practice.js; you may reuse code you wrote earlier. Use gpt-4.1 and disable SDK retries with maxRetries 0. Keep each API request a deliberate manual action.

## Implementation steps

1. Import the default OpenAI client from the openai package and create a client using OPENAI_API_KEY from the environment. Set client maxRetries to 0 for these exercises so failed calls are not retried automatically.
2. Call client.responses.create once with model gpt-4.1, input 'Write a property description', temperature 0.2, and max_output_tokens 150.
3. Await the response and print response.output_text. Write all JavaScript yourself.

## Run from the project root

~~~powershell
node --env-file=.env lessons/01-first-response/practice.js
~~~

## Experiments

- Run once with the original prompt, then manually run again with fictional property facts added.

Run each variation separately. Record the changed setting and result in [observations](../../notes/observations.md).

## Reflection

- Which parts are sent to the API, and which part prints locally?
- What information did the vague prompt leave the model to invent?

## Completion checklist

- [ ] One explicit run sends one request and prints readable text.
- [ ] You can explain every option in your request.

Judge behavior and facts rather than expecting an exact generated sentence.

## Reference

[Official OpenAI documentation](https://developers.openai.com/api/reference/resources/responses/methods/create) — use the JavaScript examples and Responses API sections as reference, then write your own implementation.

[Course index](../../README.md)

