# OpenAI API Practice

Learn by writing every exercise yourself. Each practice.js starts completely empty. There are no solutions or starter implementations. You already know JavaScript basics; this course focuses on requests and observed behavior.

## Setup in PowerShell

Node.js 22.12 or newer is required. Your workspace was checked with Node 22.12.0 and npm 10.9.0.

Run these commands yourself when ready:

~~~powershell
Set-Location 'D:\Learning\LLM\openai-practice'
node --version
npm.cmd --version
npm.cmd install
Copy-Item .env.example .env
~~~

Open .env in your editor and put your own API key after OPENAI_API_KEY=. Keep it local. Node's --env-file flag loads it; no dotenv package is required. An existing environment variable takes precedence over the .env value, so check for a stale session variable if authentication behaves unexpectedly. Never paste a key into practice.js or your notes.

The manifest uses the latest official SDK when you install. Keep the generated package-lock.json for reproducibility. No dependencies have been installed for you.

## Practice routine

1. Read the lesson README and linked API reference.
2. Predict what you expect, then implement the steps in its empty practice.js.
3. Run that lesson manually from this project root using the command below.
4. Change one thing and run again only when you choose.
5. Record results in [your observations](notes/observations.md), then use the completion checklist.

Use gpt-4.1 throughout. Access and billing depend on your API project. Each request may incur charges; use small output budgets and maxRetries 0 on the client. Never put experiments in automatic request loops. Conversation and tool exercises deliberately split API calls across separate executions.

Running an untouched practice.js exits silently because it is empty. It becomes useful after you write your implementation. There is no npm start script or automated answer checker.

## Lessons and commands

All commands below assume you are in the project root and have created .env.

1. [First response](lessons/01-first-response/README.md)

   ~~~powershell
   node --env-file=.env lessons/01-first-response/practice.js
   ~~~

2. [Prompt experiments](lessons/02-prompt-experiments/README.md)

   ~~~powershell
   node --env-file=.env lessons/02-prompt-experiments/practice.js
   ~~~

3. [Temperature](lessons/03-temperature/README.md)

   ~~~powershell
   node --env-file=.env lessons/03-temperature/practice.js
   ~~~

4. [Output limits](lessons/04-output-limits/README.md)

   ~~~powershell
   node --env-file=.env lessons/04-output-limits/practice.js
   ~~~

5. [Response inspection](lessons/05-response-inspection/README.md)

   ~~~powershell
   node --env-file=.env lessons/05-response-inspection/practice.js
   ~~~

6. [Instructions and messages](lessons/06-instructions-and-messages/README.md)

   ~~~powershell
   node --env-file=.env lessons/06-instructions-and-messages/practice.js
   ~~~

7. [Conversation history](lessons/07-conversation-history/README.md)

   ~~~powershell
   node --env-file=.env lessons/07-conversation-history/practice.js
   ~~~

8. [Structured output](lessons/08-structured-output/README.md)

   ~~~powershell
   node --env-file=.env lessons/08-structured-output/practice.js
   ~~~

9. [Streaming](lessons/09-streaming/README.md)

   ~~~powershell
   node --env-file=.env lessons/09-streaming/practice.js
   ~~~

10. [Tool calling](lessons/10-tool-calling/README.md)

   ~~~powershell
   node --env-file=.env lessons/10-tool-calling/practice.js
   ~~~

11. [Errors](lessons/11-errors/README.md)

   ~~~powershell
   node --env-file=.env lessons/11-errors/practice.js
   ~~~

12. [Final challenge](lessons/12-final-challenge/README.md)

   ~~~powershell
   node --env-file=.env lessons/12-final-challenge/practice.js
   ~~~

## Troubleshooting

- A missing .env causes Node to stop before your program starts. Copy .env.example first.
- A missing package error means you need to run npm.cmd install from this folder.
- If gpt-4.1 is unavailable to your project, check access and the error message before changing course settings.
- Token limits bound generated tokens, not words. Inspect status and incomplete_details rather than assuming every response finished.
- The model can produce different wording across runs. Verify facts and constraints yourself.

## Official references

- [OpenAI SDK setup](https://developers.openai.com/api/docs/libraries)
- [Responses API reference](https://developers.openai.com/api/reference/resources/responses/methods/create)
- [GPT-4.1](https://developers.openai.com/api/docs/models/gpt-4.1)

No API calls are required to create or inspect this workspace.

