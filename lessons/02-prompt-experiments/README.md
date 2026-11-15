# 02 — Prompt experiments

## Goal

Learn how wording affects a property description.

## Concepts

Audience; tone; factual grounding; constraints.

## Before you start

Complete the earlier lessons first. Write your own implementation in the empty practice.js; you may reuse code you wrote earlier. Use gpt-4.1 and disable SDK retries with maxRetries 0. Keep each API request a deliberate manual action.

## Implementation steps

1. Rebuild the first request in this empty file.
2. Use this fictional fixture: property P101, two bedrooms, one bathroom, balcony, near a train station; price and address unknown.
3. Keep model, temperature, and token limit fixed. Ask for a description using only the supplied facts.

## Run from the project root

~~~powershell
node --env-file=.env lessons/02-prompt-experiments/practice.js
~~~

## Experiments

- Change only the audience to first-home buyers.
- Restore the baseline, then change only the tone to professional.
- Add a maximum of three sentences and ask the model to omit unknown facts.

Run each variation separately. Record the changed setting and result in [observations](../../notes/observations.md).

## Reflection

- Which change improved usefulness?
- Did the response invent details or ignore a constraint?

## Completion checklist

- [ ] You compared a baseline with at least two manually run variations.
- [ ] Your notes distinguish supplied facts from unsupported claims.

Judge behavior and facts rather than expecting an exact generated sentence.

## Reference

[Official OpenAI documentation](https://developers.openai.com/api/reference/resources/responses/methods/create) — use the JavaScript examples and Responses API sections as reference, then write your own implementation.

[Course index](../../README.md)

