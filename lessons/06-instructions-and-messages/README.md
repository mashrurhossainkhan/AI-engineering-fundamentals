# 06 — Instructions and messages

## Goal

Separate reusable behavior from a particular writing task.

## Concepts

instructions; input messages; roles.

## Before you start

Complete the earlier lessons first. Write your own implementation in the empty practice.js; you may reuse code you wrote earlier. Use gpt-4.1 and disable SDK retries with maxRetries 0. Keep each API request a deliberate manual action.

## Implementation steps

1. Put reusable editorial guidance in instructions: use supplied facts, avoid unsupported claims, and write clearly.
2. Put the fictional property facts and requested audience in a user message in input.
3. Keep gpt-4.1 and a small output budget.

## Run from the project root

~~~powershell
node --env-file=.env lessons/06-instructions-and-messages/practice.js
~~~

## Experiments

- Keep instructions fixed and change the user audience.
- Compare the message-based input with a plain input string in a separate run.

Run each variation separately. Record the changed setting and result in [observations](../../notes/observations.md).

## Reflection

- Which guidance belongs across all requests?
- Which details belong only to this property?

## Completion checklist

- [ ] General guidance and task details occupy separate request fields.
- [ ] Changing the audience does not require rewriting your editorial guidance.

Judge behavior and facts rather than expecting an exact generated sentence.

## Reference

[Official OpenAI documentation](https://developers.openai.com/api/reference/resources/responses/methods/create) — use the JavaScript examples and Responses API sections as reference, then write your own implementation.

[Course index](../../README.md)

