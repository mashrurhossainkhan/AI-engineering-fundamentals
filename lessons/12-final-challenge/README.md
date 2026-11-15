# 12 — Final challenge

## Goal

Build a small command-line property-description assistant.

## Concepts

CLI arguments; validation; reusable instructions; selectable output modes.

## Before you start

Complete the earlier lessons first. Write your own implementation in the empty practice.js; you may reuse code you wrote earlier. Use gpt-4.1 and disable SDK retries with maxRetries 0. Keep each API request a deliberate manual action.

## Implementation steps

1. Accept a fictional property ID, audience, tone, output-token limit, and output mode through command-line arguments.
2. Use the P101/P102 local facts from lesson 10; reject unknown IDs and invalid options before calling the API.
3. Offer text, structured JSON, or streamed text as mutually exclusive output modes. Use the corresponding earlier lesson approach.
4. Keep model gpt-4.1, default temperature 0.2, default max_output_tokens 150, and disable automatic retries.
5. Print only the selected output and useful status/errors. Record usage when available. Make one request per manual execution.
6. Document the command syntax you chose in your notes, including one example for each mode.

## Run from the project root

~~~powershell
node --env-file=.env lessons/12-final-challenge/practice.js
~~~

For stages or options requiring arguments, append them after practice.js according to the argument format you implement. Record that format in your notes. This command alone is the base invocation.

## Experiments

- Describe the same property for two audiences in separate runs.
- Try an unknown property, invalid token limit, missing key, and short output budget.
- Compare whether each output mode suits reading, integration, or live display.

Run each variation separately. Record the changed setting and result in [observations](../../notes/observations.md).

## Reflection

- Which settings most improved your results?
- Which behavior would you improve next, and why?

## Completion checklist

- [ ] All three modes work on separate manual runs.
- [ ] Invalid local input is rejected before an API request.
- [ ] Incomplete output and API errors are explained.
- [ ] Your notes explain your design and show how to run it.

Judge behavior and facts rather than expecting an exact generated sentence.

## Reference

[Official OpenAI documentation](https://developers.openai.com/api/reference/resources/responses/methods/create) — use the JavaScript examples and Responses API sections as reference, then write your own implementation.

[Course index](../../README.md)

