---
title: Kokomi-api Docs
description: Kokomi-api multi-protocol integration, model groups, and client configuration
aside: false
outline: false
prev: false
next: false
---

# Kokomi-api Docs

Kokomi-api is a unified API gateway powered by New API. It supports OpenAI Chat Completions, Responses, Anthropic Messages, and Gemini interfaces for Codex, Claude Code, Cherry Studio, CC Switch, and SDKs or clients with custom Base URLs. Available protocols depend on the selected model and token group.

## Integration Details {#integration-details}

| Item | URL |
| --- | --- |
| Website | [https://kokomi-api.cc](https://kokomi-api.cc) |
| Dashboard | [https://kokomi-api.cc/dashboard](https://kokomi-api.cc/dashboard) |
| Sign up | [https://kokomi-api.cc/sign-up](https://kokomi-api.cc/sign-up) |
| Model marketplace | [https://kokomi-api.cc/pricing](https://kokomi-api.cc/pricing) |
| OpenAI API Base URL (Chat / Responses) | `https://kokomi-api.cc/v1` |
| Anthropic API Base URL | `https://kokomi-api.cc` |
| Gemini API host | `https://kokomi-api.cc` |

Models, groups, protocol support, and prices may change. Before making requests, check the [model marketplace](https://kokomi-api.cc/pricing) for the exact model name, supported endpoints, and current price instead of relying on a fixed list or conversion rate in this documentation.

## Models, Groups, and Pricing {#models-and-pricing}

Search the [model marketplace](https://kokomi-api.cc/pricing) and filter by provider, group, or endpoint. Cards show model names, groups, endpoints, and prices. Open Details to view Overview, Performance, and API tabs.

### Current model and group snapshot

The following public-page snapshot was checked on **2026-10-13**. It helps identify request names; the live website remains authoritative for availability, access, and prices.

| Model names | Displayed groups | Displayed endpoints |
| --- | --- | --- |
| `gpt-6-astra`, `gpt-6-luna`, `gpt-6-sol`, `gpt-6.1-sol` | Codex, ChatGPT-Pro | Chat, Response |
| `claude-haiku-5-5`, `claude-opus-4-6`, `claude-opus-5-5`, `claude-sonnet-4-6`, `claude-sonnet-5-5` | Claude-MAX, ClaudeCode | Anthropic, Chat |
| `claude-fable-5-1` | Claude-MAX | Anthropic, Chat |
| `gemini-3.8-flash` | Antigravity | Gemini, Chat |

These are this gateway’s request identifiers. Use Copy model name rather than changing versions, hyphens, or provider prefixes. A group selects token routing and billing; it is not the JSON `model` value. Available token groups are determined by the signed-in dashboard.

### Reading prices

- Select a group and check input, output, cache-read, and cache-write prices. The same model may have different prices in different groups.
- The marketplace offers Standard / Recharge display modes and `/1M /1K` token units. Compare prices using the same mode, unit, and group.
- For Dynamic billing models, open Details to check pricing tiers and conditions. A single card price does not describe every request.
- Performance shows recent statistics. Missing data does not prove a model is unavailable, and historical latency or success rates do not guarantee your next request.

## Protocol Selection {#protocol-selection}

| Marketplace label | Interface | Full request path | Main request fields |
| --- | --- | --- | --- |
| Chat / `openai` | OpenAI Chat Completions | `POST /v1/chat/completions` | `messages` |
| Response / `openai-response` | OpenAI Responses | `POST /v1/responses` | `input` |
| Anthropic / `anthropic` | Anthropic Messages | `POST /v1/messages` | `messages`, `max_tokens` |
| Gemini / `gemini` | Gemini GenerateContent | `POST /v1beta/models/{model}:generateContent` | `contents` |

All paths are relative to `https://kokomi-api.cc`. SDK Base URLs differ from full HTTP request URLs; use the examples below. Each model’s API tab provides model-specific examples. Request parameters must match the selected protocol.

## Quick Start {#quick-start}

### 1. Sign up and sign in

Create an account on the [sign-up page](https://kokomi-api.cc/sign-up), then open the [dashboard](https://kokomi-api.cc/dashboard). Existing users can use the [sign-in page](https://kokomi-api.cc/sign-in).

### 2. Create an API key

After signing in, open the Tokens page, create an API key, select an available group, and copy the token completely. If you configure model restrictions, IP restrictions, or a quota, make sure your request is allowed.

- Do not include spaces or line breaks around the token.
- Do not commit the token to a repository or expose it in frontend code, chats, or screenshots.
- If a token is exposed, delete it in the dashboard and create a replacement immediately.

### 3. Choose a model

Copy the model name from the [model marketplace](https://kokomi-api.cc/pricing) and confirm that it supports your endpoint. Codex requires Responses support; Claude Code requires a Claude model with Anthropic endpoint support. General chat clients typically use Chat Completions, while Google-format clients use the Gemini endpoint.

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

## OpenAI Chat Completions {#openai-chat-completions}

Use models labeled `Chat` / `openai` with OpenAI-compatible chat clients. Set `KOKOMI_API_KEY` as shown in Quick Start and replace `<model>` with the selected model name.

### curl example

```bash
curl https://kokomi-api.cc/v1/chat/completions \
  -H "Authorization: Bearer $KOKOMI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "<model>",
    "messages": [{"role": "user", "content": "Say hello from Kokomi-api."}]
  }'
```

### Python example

Install the SDK with `pip install openai`.

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["KOKOMI_API_KEY"],
    base_url="https://kokomi-api.cc/v1",
)

completion = client.chat.completions.create(
    model="<model>",
    messages=[{"role": "user", "content": "Say hello from Kokomi-api."}],
)
print(completion.choices[0].message.content)
```

Response text is typically in `choices[0].message.content`. For streaming, add `"stream": true` to the request and use an SSE-capable client.

## OpenAI Responses API {#openai-responses-api}

Responses is the protocol used by Codex. Select a model labeled `Response` / `openai-response` in the marketplace and confirm access through your token group. Chat Completions support does not imply Responses support.

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

Install the SDK with `pip install openai`.

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

Install the SDK with `npm install openai`.

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

Claude Code and Anthropic SDKs use the Anthropic-compatible API. It uses a different protocol from the OpenAI interfaces, so do not mix their paths or request bodies.

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

Install the SDK with `pip install anthropic`.

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

Install the SDK with `npm install @anthropic-ai/sdk`.

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

## Native Gemini API {#gemini-api}

Use models labeled `Gemini` / `gemini` with Google-format `contents` and `parts`. The API host is `https://kokomi-api.cc`.

Set `KOKOMI_API_KEY` and replace `<model>` with an exact model name that supports the Gemini endpoint:

```bash
export KOKOMI_MODEL="<model>"

curl "https://kokomi-api.cc/v1beta/models/${KOKOMI_MODEL}:generateContent" \
  -H "x-goog-api-key: $KOKOMI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [
      {"role": "user", "parts": [{"text": "Say hello from Kokomi-api."}]}
    ]
  }'
```

Response text is in `candidates[].content.parts[].text`. This example sends the key in a header; do not share query URLs containing real keys in logs or screenshots. If a Gemini model also lists Chat, you can use the Chat Completions example instead, with that protocol’s request and response structure.

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
- Merge these fields into existing configuration without duplicating TOML tables. `model_reasoning_effort` is optional and must be supported by the selected model.
- This setup reads the token via `env_key`; it does not require replacing `auth.json` or adding unrelated permission settings.
- See the [official Codex configuration reference](https://developers.openai.com/codex/config-reference/) for provider fields.

## Claude Code Configuration {#claude-code-configuration}

Claude Code connects through the Anthropic-compatible API. Set these values in the current shell:

```bash
export ANTHROPIC_API_KEY="<KOKOMI_API_KEY>"
export ANTHROPIC_BASE_URL="https://kokomi-api.cc"
export ANTHROPIC_MODEL="<model>"

claude
```

To persist the values, merge `env` into your existing user-level `~/.claude/settings.json`, preserving other settings:

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

## Common Clients {#client-configuration}

The website links to [Cherry Studio](https://cherry-ai.com) and [CC Switch](https://ccswitch.io). For manual setup, match the client’s protocol:

| Client / use | Protocol | Service URL | Model requirement |
| --- | --- | --- | --- |
| Cherry Studio and OpenAI-compatible chat clients | Chat Completions | `https://kokomi-api.cc/v1` | Chat support |
| Codex / CC Switch Codex configuration | Responses | `https://kokomi-api.cc/v1` | Response support |
| Claude Code / CC Switch Claude Code configuration | Anthropic | `https://kokomi-api.cc` | Anthropic support |
| Google-format Gemini clients | Gemini | `https://kokomi-api.cc` (native paths start with `/v1beta`) | Gemini support |

Use your Kokomi-api token and copy the exact model name from the marketplace. If a client appends `/v1` automatically, check the final URL to avoid `/v1/v1/...`. URL joining rules vary by client; compare its final path with the model’s API tab.

## FAQ {#faq}

### Should I use Chat or Responses?

Choose based on your client and the endpoints shown in the marketplace. General OpenAI-compatible chat clients typically use `/v1/chat/completions`; Codex uses `/v1/responses`. Chat uses `messages`; Responses uses `input`. If a request fails, check the model, endpoint, and token group. Changing only the URL while keeping the other protocol’s body will not fix a protocol mismatch.

### Why does Codex still ask me to sign in to OpenAI?

Confirm that `model_provider` points to the `kokomi-api` custom provider above and that `KOKOMI_API_KEY` is set. Do not set `requires_openai_auth = true` or depend on `~/.codex/auth.json` for the Kokomi-api token.

### What should I check for a `401` or `403` response?

Confirm that the token is complete and active, that the environment variable is set in the same shell that launches the client, and that your account can use the selected model. Never include a complete token in logs or screenshots.

### What if a model is not found or no channel is available?

Copy the model name again and check endpoint support, token group, model restrictions, and account quota. A public model card does not grant every token access. Do not use a group name as the model name.

### Why can a card price differ from a charge?

Check Standard / Recharge mode, token units, the actual group, dynamic pricing tiers, and output or cache usage. Use current model details and dashboard usage records to reconcile charges.

### What if an API request times out?

Confirm the Base URL, endpoint, and model name first. Then shorten the input, reduce the maximum output length, or increase the client timeout. Use a limited exponential-backoff retry for temporary network errors. If only one model fails, compare it with another model that supports the same protocol.

## Support {#support}

Use the current announcements and support channels published on the [Kokomi-api website](https://kokomi-api.cc). Include the request time, endpoint, model name, HTTP status, and a redacted request ID or log snippet. Never submit a complete API key.
