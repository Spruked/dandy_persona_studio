# Dandy Persona Studio

A local, buildless HTML/CSS/JavaScript reference implementation for the Phil Dandy and Jim Dandy Persona Invocation SKGs.

## Open in VS Code

Open this folder:

```text
dandy-persona-studio/
```

Then open `index.html` in a browser, or use VS Code's Live Server extension for the smoothest experience.

## Included

- Responsive overview of both personas
- Phil/Jim behavioral tendencies and voice-performance guidance
- Interactive relationship/conversation example
- Contract guardrails and pinned knowledge sets
- “Copy invocation brief” button for handing the rules to a dialogue generator

## Standalone runtime

The `src/` module is provider-neutral and intentionally stops at the character-context boundary. `buildModelRequest()` retrieves the two persona SKGs plus relationship and episode context and returns a model-agnostic request envelope. A provider adapter can send that envelope to any LLM without changing the character definitions.

`verifyDialogue()` independently normalizes and checks returned turns for allowed identity, source-boundary violations, canonical joke leaks, and one-speaker interview behavior. It returns `pic:Passed` or `pic:Failed` and never owns script writing or audio generation.

The `canonical/` directory is copied from the local DANDY_SHOW_V3 persona source and is now the runtime authority. The package pins the bible-locked SKGs at `bible-v1.2`; missing/open fields stay explicit and are never fabricated. Contract bindings for OpenAI, Nemotron, and local vLLM are in `contract/`, with conformance fixtures in `conformance/fixtures/`.

Run the tests with Node:

```text
node tests/runtime.test.js
```

The page is intentionally buildless: there is no package install or build step required.
