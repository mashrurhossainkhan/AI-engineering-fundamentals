# 07 — Conversation history

## Goal

Revise a description with context from an earlier response.

## Concepts

previous_response_id; follow-up context; request-local instructions.

## Before you start

Complete the earlier lessons first. Write your own implementation in the empty practice.js; you may reuse code you wrote earlier. Use gpt-4.1 and disable SDK retries with maxRetries 0. Keep each API request a deliberate manual action.

## Implementation steps

1. Use the first run to create a description and display its response ID.
2. Accept a previous response ID and revision request through command-line arguments on a later execution.
3. Send a single follow-up using previous_response_id and ask to shorten the earlier description. Repeat your instructions explicitly on that request.
4. Do not trigger a second request automatically after the first response.

## Run from the project root

~~~powershell
node --env-file=.env lessons/07-conversation-history/practice.js
~~~

For stages or options requiring arguments, append them after practice.js according to the argument format you implement. Record that format in your notes. This command alone is the base invocation.

## Experiments

- Request a warmer tone using the previous response ID.
- Compare with a new request that has no previous_response_id.

Run each variation separately. Record the changed setting and result in [observations](../../notes/observations.md).

## Reflection

- What context was missing from the fresh request?
- Why should you deliberately reapply instructions on each turn?

## Completion checklist

- [ ] Each execution sends at most one request.
- [ ] A separate manual follow-up revises the earlier description.

Judge behavior and facts rather than expecting an exact generated sentence.

## Reference

[Official OpenAI documentation](https://developers.openai.com/api/reference/resources/responses/methods/create) — use the JavaScript examples and Responses API sections as reference, then write your own implementation.

[Course index](../../README.md)

