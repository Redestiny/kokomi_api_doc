---
title: Kokomi-api Docs
description: Kokomi-api native Responses API and Anthropic-compatible API documentation
aside: false
outline: false
prev: false
next: false
---

# Kokomi-api Docs

Kokomi-api is powered by New API and provides a native OpenAI Responses API plus an Anthropic-compatible API for Codex, Claude Code, SDKs, and clients that support custom Base URLs.

## Integration Details {#integration-details}

| Item | URL |
| --- | --- |
| Website | [https://kokomi-api.cc](https://kokomi-api.cc) |
| Dashboard | [https://kokomi-api.cc/dashboard](https://kokomi-api.cc/dashboard) |
| Sign up | [https://kokomi-api.cc/sign-up](https://kokomi-api.cc/sign-up) |
| Model marketplace | [https://kokomi-api.cc/pricing](https://kokomi-api.cc/pricing) |
| Responses API Base URL | `https://kokomi-api.cc/v1` |
| Anthropic API Base URL | `https://kokomi-api.cc` |

Models, groups, protocol support, and prices may change. Before making requests, check the [model marketplace](https://kokomi-api.cc/pricing) for the exact model name, supported endpoints, and current price instead of relying on a fixed list or conversion rate in this documentation.

## Quick Start {#quick-start}

### 1. Sign up and sign in

Create an account on the [sign-up page](https://kokomi-api.cc/sign-up), then open the [dashboard](https://kokomi-api.cc/dashboard). Existing users can use the [sign-in page](https://kokomi-api.cc/sign-in).

### 2. Create an API key

After signing in, open the token or API key page in the dashboard, create a token, and copy it completely.

- Do not include spaces or line breaks around the token.
- Do not commit the token to a repository or expose it in frontend code, chats, or screenshots.
- If a token is exposed, delete it in the dashboard and create a replacement immediately.

### 3. Choose a model

Copy the model name from the [model marketplace](https://kokomi-api.cc/pricing) and confirm that it supports your endpoint. Codex needs an OpenAI model with Responses support; Claude Code needs a Claude model with Anthropic endpoint support.

### 4. Send your first Responses request

```bash
export KOKOMI_API_KEY="<KOKOMI_API_KEY>"

curl https://kokomi-api.cc/v1/responses \
  -H "Authorization: Bearer $KOKOMI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "<model>",
    "input": "Introduce Kokomi-api in one sentence."
  }'
```

Text is returned inside the `output` array. The official OpenAI SDK exposes the aggregated text as `response.output_text`.

## OpenAI Responses API {#openai-responses-api}

The native Responses API is the primary OpenAI integration for Kokomi-api. Legacy `POST /v1/chat/completions` examples do not apply to models or groups that only expose the Responses endpoint.

### Basic information

| Item | Value |
| --- | --- |
| Base URL | `https://kokomi-api.cc/v1` |
| Endpoint | `POST /responses` |
| Full URL | `https://kokomi-api.cc/v1/responses` |
| Auth header | `Authorization: Bearer <KOKOMI_API_KEY>` |
| Request input | `input` |

### curl example

```bash
curl https://kokomi-api.cc/v1/responses \
  -H "Authorization: Bearer <KOKOMI_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "<model>",
    "input": [
      {
        "role": "user",
        "content": "Say hello from Kokomi-api."
      }
    ]
  }'
```

### Python example

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["KOKOMI_API_KEY"],
    base_url="https://kokomi-api.cc/v1",
)

response = client.responses.create(
    model="<model>",
    input="Say hello from Kokomi-api.",
)

print(response.output_text)
```

### JavaScript example

```js
import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.KOKOMI_API_KEY,
  baseURL: 'https://kokomi-api.cc/v1'
})

const response = await client.responses.create({
  model: '<model>',
  input: 'Say hello from Kokomi-api.'
})

console.log(response.output_text)
```

### Configuration notes

- Set the SDK Base URL to `https://kokomi-api.cc/v1`; the SDK appends `/responses`.
- For direct HTTP requests, use `https://kokomi-api.cc/v1/responses`.
- Use the Responses API `input` field instead of a Chat Completions `messages` request body.
- The model name must exactly match a model in the marketplace that supports the Responses endpoint.

## Anthropic-Compatible API {#anthropic-compatible-api}

Claude Code and Anthropic SDKs use the Anthropic-compatible API. It is separate from the Responses API, so do not mix their paths or request bodies.

### Basic information

| Item | Value |
| --- | --- |
| Base URL | `https://kokomi-api.cc` |
| Endpoint | `POST /v1/messages` |
| Auth header | `x-api-key: <KOKOMI_API_KEY>` |
| Version header | `anthropic-version: 2023-06-01` |

### curl example

```bash
curl https://kokomi-api.cc/v1/messages \
  -H "x-api-key: <KOKOMI_API_KEY>" \
  -H "anthropic-version: 2023-06-01" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "<model>",
    "max_tokens": 512,
    "messages": [
      {
        "role": "user",
        "content": "Say hello from Kokomi-api."
      }
    ]
  }'
```

### Python example

```python
import os
from anthropic import Anthropic

client = Anthropic(
    api_key=os.environ["KOKOMI_API_KEY"],
    base_url="https://kokomi-api.cc",
)

message = client.messages.create(
    model="<model>",
    max_tokens=512,
    messages=[
        {"role": "user", "content": "Say hello from Kokomi-api."},
    ],
)

print(message.content[0].text)
```

### JavaScript example

```js
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.KOKOMI_API_KEY,
  baseURL: 'https://kokomi-api.cc'
})

const message = await anthropic.messages.create({
  model: '<model>',
  max_tokens: 512,
  messages: [
    { role: 'user', content: 'Say hello from Kokomi-api.' }
  ]
})

console.log(message.content[0].text)
```

## Codex Configuration {#codex-configuration}

Codex connects through the native Responses API. Use a dedicated environment variable for the API key. You do not need to edit `~/.codex/auth.json`, and you should not enable `requires_openai_auth` for this custom provider.

Set the API key first:

```bash
export KOKOMI_API_KEY="<KOKOMI_API_KEY>"
```

Edit the user-level `~/.codex/config.toml`:

```toml
model = "<model>"
model_provider = "kokomi-api"
model_reasoning_effort = "high"

[model_providers.kokomi-api]
name = "Kokomi-api"
base_url = "https://kokomi-api.cc/v1"
env_key = "KOKOMI_API_KEY"
wire_api = "responses"
```

Then start Codex:

```bash
codex
```

Notes:

- `wire_api = "responses"` makes Codex call `POST /v1/responses`.
- `model_providers` is user-level provider configuration. Put it in `~/.codex/config.toml`, not only in a project `.codex/config.toml`.
- Replace `<model>` with an exact model name from the marketplace that supports Responses.
- Legacy `openai_base_url`, `requires_openai_auth = true`, `~/.codex/auth.json`, and top-level `network_access` settings do not apply to this custom provider configuration.

## Claude Code Configuration {#claude-code-configuration}

Claude Code connects through the Anthropic-compatible API. Set these values in the current shell:

```bash
export ANTHROPIC_API_KEY="<KOKOMI_API_KEY>"
export ANTHROPIC_BASE_URL="https://kokomi-api.cc"
export ANTHROPIC_MODEL="<model>"

claude
```

To persist the values, edit the user-level `~/.claude/settings.json`:

```json
{
  "env": {
    "ANTHROPIC_API_KEY": "<KOKOMI_API_KEY>",
    "ANTHROPIC_BASE_URL": "https://kokomi-api.cc",
    "ANTHROPIC_MODEL": "<model>",
    "API_TIMEOUT_MS": "600000"
  }
}
```

Notes:

- Set the Base URL to `https://kokomi-api.cc` without appending `/v1/messages`.
- Replace `<model>` with an exact model name from the marketplace that supports the Anthropic endpoint.
- Restart the `claude` process after changing configuration.
- Do not commit settings containing a real API key to a project repository.

## FAQ {#faq}

### Why does `/v1/chat/completions` fail?

The current OpenAI integration uses the native Responses API. Change the request URL to `/v1/responses` and replace the Chat Completions `messages` body with the Responses API `input` field.

### Why does Codex still ask me to sign in to OpenAI?

Confirm that `model_provider` points to the `kokomi-api` custom provider above and that `KOKOMI_API_KEY` is set. Do not set `requires_openai_auth = true` or depend on `~/.codex/auth.json` for the Kokomi-api token.

### What should I check for a `401` or `403` response?

Confirm that the token is complete and active, that the environment variable is set in the same shell that launches the client, and that your account can use the selected model. Never include a complete token in logs or screenshots.

### What if an API request times out?

Confirm the Base URL, endpoint, and model name first. Then shorten the input, reduce the maximum output length, or increase the client timeout. Use a limited exponential-backoff retry for temporary network errors. If only one model fails, compare it with another model that supports the same protocol.

## Support {#support}

Use the current announcements and support channels published on the [Kokomi-api website](https://kokomi-api.cc). Include the request time, endpoint, model name, HTTP status, and a redacted request ID or log snippet. Never submit a complete API key.
