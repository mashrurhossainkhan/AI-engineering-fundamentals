# 04 — Output limits

## Goal

Recognize when an output budget cuts a response short.

## Concepts

Tokens versus words; response status; incomplete_details.

## Before you start

Complete the earlier lessons first. Write your own implementation in the empty practice.js; you may reuse code you wrote earlier. Use gpt-4.1 and disable SDK retries with maxRetries 0. Keep each API request a deliberate manual action.

## Implementation steps

1. Request a detailed property description with max_output_tokens 40.
2. Print the text, status, and incomplete_details.
3. Repeat manually with a limit of 150 and then 300; keep the prompt fixed.

## Run from the project root

~~~powershell
node --env-file=.env lessons/04-output-limits/practice.js
~~~

## Experiments

- Ask for three sentences while retaining a generous token budget.
- Compare a prompt length instruction with the hard output budget.

Run each variation separately. Record the changed setting and result in [observations](../../notes/observations.md).

## Reflection

- Did the short response finish naturally?
- Why is 150 tokens different from 150 words?

## Completion checklist

- [ ] You inspect incomplete_details rather than guessing from text alone.
- [ ] You distinguish requested length from maximum token allowance.

Judge behavior and facts rather than expecting an exact generated sentence.

## Reference

[Official OpenAI documentation](https://developers.openai.com/api/reference/resources/responses/methods/create) — use the JavaScript examples and Responses API sections as reference, then write your own implementation.

[Course index](../../README.md)

