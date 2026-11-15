# 11 — Errors

## Goal

Make failures understandable without exposing credentials.

## Concepts

Local validation; API errors; status codes; connection failures.

## Before you start

Complete the earlier lessons first. Write your own implementation in the empty practice.js; you may reuse code you wrote earlier. Use gpt-4.1 and disable SDK retries with maxRetries 0. Keep each API request a deliberate manual action.

## Implementation steps

1. Check for a missing OPENAI_API_KEY before constructing the client.
2. Use try/catch around the request and keep maxRetries at 0.
3. Report a concise error category, available HTTP status, and useful message. Never print the key or request authorization headers.
4. Distinguish missing credentials, authentication, invalid requests, rate limits, and connection failures. Describe the appropriate next action instead of retrying automatically.

## Run from the project root

~~~powershell
node --env-file=.env lessons/11-errors/practice.js
~~~

## Experiments

- Temporarily remove the key from your local configuration and verify that the failure is local; restore it afterward.
- Manually send an invalid request option value to observe a request error.
- For rate limits and connection errors, write down expected handling; do not deliberately exhaust quota or break your network.

Run each variation separately. Record the changed setting and result in [observations](../../notes/observations.md).

## Reflection

- Which failures can editing the request fix?
- When would retrying the exact same request be unhelpful?

## Completion checklist

- [ ] Missing credentials produce a clear local message.
- [ ] One failed request does not trigger an automatic retry loop.
- [ ] Error output contains no secret values.

Judge behavior and facts rather than expecting an exact generated sentence.

## Reference

[Official OpenAI documentation](https://developers.openai.com/api/reference/resources/responses/methods/create) — use the JavaScript examples and Responses API sections as reference, then write your own implementation.

[Course index](../../README.md)

