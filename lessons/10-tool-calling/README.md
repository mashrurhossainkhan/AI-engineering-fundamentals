# 10 — Tool calling

## Goal

Let the model request fictional facts from your local program.

## Concepts

Function tools; arguments; call_id; function_call_output.

## Before you start

Complete the earlier lessons first. Write your own implementation in the empty practice.js; you may reuse code you wrote earlier. Use gpt-4.1 and disable SDK retries with maxRetries 0. Keep each API request a deliberate manual action.

## Implementation steps

1. Create a local lookup inside this practice file: P101 has two bedrooms, one bathroom, and a balcony; P102 has three bedrooms, two bathrooms, and a garden.
2. Declare a strict function tool named lookup_property with one required string argument, property_id, and no additional properties.
3. Ask for a description of P101. Inspect function_call output items, parse and validate the arguments, and call only the allowed local lookup.
4. Print the lookup result and tool call ID. Do not send a second request yet.
5. On a separate manual run, accept the previous response ID, call ID, and serialized lookup result as arguments. Submit a function_call_output matched by call_id, using previous_response_id for context, and request the final description.

## Run from the project root

~~~powershell
node --env-file=.env lessons/10-tool-calling/practice.js
~~~

For stages or options requiring arguments, append them after practice.js according to the argument format you implement. Record that format in your notes. This command alone is the base invocation.

## Experiments

- Try P999; return a clear not-found result rather than invented facts.
- If no function call is returned, report that explicitly; optionally force the named tool for the first request.

Run each variation separately. Record the changed setting and result in [observations](../../notes/observations.md).

## Reflection

- Who executes the lookup: the model or your JavaScript?
- Why must the returned call_id match?

## Completion checklist

- [ ] You complete lookup and final-answer stages through separate manual executions.
- [ ] Unknown properties and invalid tool arguments do not produce fabricated lookup facts.

Judge behavior and facts rather than expecting an exact generated sentence.

## Reference

[Official OpenAI documentation](https://developers.openai.com/api/docs/guides/function-calling) — use the JavaScript examples and Responses API sections as reference, then write your own implementation.

[Course index](../../README.md)

