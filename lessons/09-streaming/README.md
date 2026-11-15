# 09 — Streaming

## Goal

Display text progressively.

## Concepts

stream; async iteration; text deltas; terminal events.

## Before you start

Complete the earlier lessons first. Write your own implementation in the empty practice.js; you may reuse code you wrote earlier. Use gpt-4.1 and disable SDK retries with maxRetries 0. Keep each API request a deliberate manual action.

## Implementation steps

1. Send a familiar request with stream enabled.
2. Iterate through the returned events and write only response.output_text.delta text to standard output without a newline after every chunk.
3. Track terminal completion, incomplete, failed, and error events; print a final newline and a useful status.
4. Accumulate deltas if you want to compare the final text with what appeared live.

## Run from the project root

~~~powershell
node --env-file=.env lessons/09-streaming/practice.js
~~~

## Experiments

- Manually compare streamed and non-streamed versions of the same prompt.

Run each variation separately. Record the changed setting and result in [observations](../../notes/observations.md).

## Reflection

- What is a text delta?
- Why is receiving some text insufficient evidence of successful completion?

## Completion checklist

- [ ] Text appears progressively without dumping raw event objects.
- [ ] An interrupted or failed stream is not reported as a completed description.

Judge behavior and facts rather than expecting an exact generated sentence.

## Reference

[Official OpenAI documentation](https://developers.openai.com/api/docs/guides/streaming-responses) — use the JavaScript examples and Responses API sections as reference, then write your own implementation.

[Course index](../../README.md)

