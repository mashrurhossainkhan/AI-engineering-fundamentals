# 03 — Temperature

## Goal

Observe variation without changing the task.

## Concepts

Sampling; variation; controlled comparison.

## Before you start

Complete the earlier lessons first. Write your own implementation in the empty practice.js; you may reuse code you wrote earlier. Use gpt-4.1 and disable SDK retries with maxRetries 0. Keep each API request a deliberate manual action.

## Implementation steps

1. Write a single request using the same fictional facts and prompt as lesson 02.
2. Begin at temperature 0.2 with a fixed output limit.
3. Keep the script to one request per execution; manually rerun it for comparisons.

## Run from the project root

~~~powershell
node --env-file=.env lessons/03-temperature/practice.js
~~~

## Experiments

- Run twice at 0.2, then twice at 1.0; record each result.
- Compare wording, structure, and factual accuracy.

Run each variation separately. Record the changed setting and result in [observations](../../notes/observations.md).

## Reflection

- Did low temperature make the text identical? Do not assume it guarantees determinism.
- Does more varied wording make the result more accurate?

## Completion checklist

- [ ] Your notes include both temperature settings and repeated observations.
- [ ] Only temperature changed between the two groups.

Judge behavior and facts rather than expecting an exact generated sentence.

## Reference

[Official OpenAI documentation](https://developers.openai.com/api/reference/resources/responses/methods/create) — use the JavaScript examples and Responses API sections as reference, then write your own implementation.

[Course index](../../README.md)

