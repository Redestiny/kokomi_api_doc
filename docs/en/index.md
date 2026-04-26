---
title: Kokomi-api Docs
description: Kokomi-api API relay documentation
aside: false
outline: false
prev: false
next: false
---

# Kokomi-api Docs

Kokomi-api provides OpenAI-compatible and Claude/Anthropic-compatible APIs. You can connect it to apps, scripts, SDKs, or clients that support custom Base URLs.

## Integration Details {#integration-details}

| Item | URL |
| --- | --- |
| Main site and console | [https://kokomi-api.cc](https://kokomi-api.cc) |
| Registration | [https://kokomi-api.cc/register](https://kokomi-api.cc/register) |
| API key management | [https://kokomi-api.cc/console/token](https://kokomi-api.cc/console/token) |
| OpenAI-compatible Base URL | `https://kokomi-api.cc/v1` |
| Claude/Anthropic-compatible Base URL | `https://kokomi-api.cc` |
| Top-up rate | `1 CNY = 1 USD credit` |

## Quick Start {#quick-start}

### 1. Register an account

Open the [registration page](https://kokomi-api.cc/register) and create an account. After registration, open the [console](https://kokomi-api.cc).

### 2. Create or copy an API key

Go to [API key management](https://kokomi-api.cc/console/token), create a token, and copy it completely.

Before using it, confirm that:

- There are no extra spaces or line breaks before or after the token.
- OpenAI-compatible requests use `Authorization: Bearer <KOKOMI_API_KEY>`.
- Claude/Anthropic-compatible requests use `x-api-key: <KOKOMI_API_KEY>`.
- You do not commit the token to public repositories, frontend code, or screenshots.

### 3. Check your balance

Confirm that your console balance is available. Top-up rate: `1 CNY = 1 USD credit`.

If the balance does not appear immediately after payment, refresh the console and wait briefly. If it still does not recover, keep the order details and contact support. Support contact to be added.

### 4. Send your first request

OpenAI-compatible test request:

```bash
curl https://kokomi-api.cc/v1/chat/completions \
  -H "Authorization: Bearer <KOKOMI_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "<model>",
    "messages": [
      {
        "role": "user",
        "content": "Hello, introduce Kokomi-api in one sentence."
      }
    ]
  }'
```

Claude/Anthropic-compatible test request:

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
        "content": "Hello, introduce Kokomi-api in one sentence."
      }
    ]
  }'
```

## OpenAI-Compatible API {#openai-compatible-api}

Most OpenAI clients that support a custom Base URL only need a different `base_url` and API key.

### Basic information

| Item | Value |
| --- | --- |
| Base URL | `https://kokomi-api.cc/v1` |
| API key | Create one in [API key management](https://kokomi-api.cc/console/token) |
| Auth header | `Authorization: Bearer <KOKOMI_API_KEY>` |
| Example endpoint | `/chat/completions` |

### curl example

```bash
curl https://kokomi-api.cc/v1/chat/completions \
  -H "Authorization: Bearer <KOKOMI_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "<model>",
    "messages": [
      {
        "role": "system",
        "content": "You are a helpful assistant."
      },
      {
        "role": "user",
        "content": "Say hello from Kokomi-api."
      }
    ]
  }'
```

### Python example

```python
from openai import OpenAI

client = OpenAI(
    api_key="<KOKOMI_API_KEY>",
    base_url="https://kokomi-api.cc/v1",
)

response = client.chat.completions.create(
    model="<model>",
    messages=[
        {"role": "user", "content": "Say hello from Kokomi-api."},
    ],
)

print(response.choices[0].message.content)
```

### JavaScript example

```js
import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.KOKOMI_API_KEY,
  baseURL: 'https://kokomi-api.cc/v1'
})

const response = await client.chat.completions.create({
  model: '<model>',
  messages: [
    { role: 'user', content: 'Say hello from Kokomi-api.' }
  ]
})

console.log(response.choices[0].message.content)
```

### Configuration notes

- Use `https://kokomi-api.cc/v1` as the Base URL.
- Use the token from the Kokomi-api console as your API key.
- Fill `<model>` with an actual model name available to your account.
- If your client automatically appends `/v1`, do not configure `/v1/v1`.

## Claude/Anthropic-Compatible API {#claude-anthropic-compatible-api}

The Claude/Anthropic-compatible API is for SDKs, scripts, and clients that support an Anthropic Base URL.

### Basic information

| Item | Value |
| --- | --- |
| Base URL | `https://kokomi-api.cc` |
| API key | Create one in [API key management](https://kokomi-api.cc/console/token) |
| Auth header | `x-api-key: <KOKOMI_API_KEY>` |
| Version header | `anthropic-version: 2023-06-01` |
| Example endpoint | `/v1/messages` |

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

### Environment variables

```bash
export ANTHROPIC_API_KEY="<KOKOMI_API_KEY>"
export ANTHROPIC_BASE_URL="https://kokomi-api.cc"
```

If your tool uses different variable names, follow that tool's configuration guide. The core values remain the same: use `https://kokomi-api.cc` as the Base URL and your Kokomi-api token as the API key.

### Python example

```python
from anthropic import Anthropic

client = Anthropic(
    api_key="<KOKOMI_API_KEY>",
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

### Configuration notes

- Use `https://kokomi-api.cc` as the Base URL and `/v1/messages` as the request path.
- Include both `x-api-key` and `anthropic-version` headers.
- Fill `<model>` with an actual model name available to your account.
- If your client asks for a full endpoint, use `https://kokomi-api.cc/v1/messages`.

## Codex Configuration {#codex-configuration}

This section shows how to connect Kokomi-api to Codex. Replace `<KOKOMI_API_KEY>` and `<model>` with your Kokomi-api token and an actual model available to your account.

Codex uses the OpenAI-compatible API. First set your API key:

```bash
export OPENAI_API_KEY="<KOKOMI_API_KEY>"
```

Then edit the Codex config file at `~/.codex/config.toml`:

```toml
model = "<model>"
model_provider = "openai"
openai_base_url = "https://kokomi-api.cc/v1"
forced_login_method = "api"
```

Start Codex after saving the config:

```bash
codex
```

If your Codex version supports selecting a model from the command line, you can also start it with:

```bash
codex -m <model>
```

Notes:

- Use `https://kokomi-api.cc/v1` as the Codex Base URL.
- Use your Kokomi-api console token as `OPENAI_API_KEY`.
- Do not commit API keys to project repositories or public config files.
- If you see `/responses`, model capability, or authentication errors, confirm that your account, model, and current tool version support the required OpenAI-compatible capability.

## Claude Code Configuration {#claude-code-configuration}

Claude Code uses the Claude/Anthropic-compatible API. For a temporary shell session, set these environment variables:

```bash
export ANTHROPIC_API_KEY="<KOKOMI_API_KEY>"
export ANTHROPIC_BASE_URL="https://kokomi-api.cc"
export ANTHROPIC_MODEL="<model>"
```

Then start Claude Code:

```bash
claude
```

To persist the values in your local user settings, add them to `~/.claude/settings.json`:

```json
{
  "env": {
    "ANTHROPIC_API_KEY": "<KOKOMI_API_KEY>",
    "ANTHROPIC_BASE_URL": "https://kokomi-api.cc",
    "ANTHROPIC_MODEL": "<model>"
  }
}
```

Notes:

- Use `https://kokomi-api.cc` as the Claude Code Base URL, without appending `/v1/messages` here.
- Use your Kokomi-api console token as `ANTHROPIC_API_KEY`.
- If you store `.claude/settings.json` inside a project directory, do not put a real API key in it.
- If the tool asks you to log in again or still calls the official endpoint, restart your terminal and run `claude` again.

## FAQ {#faq}

### What if the token was not copied completely?

Go back to [API key management](https://kokomi-api.cc/console/token) and copy the complete token again. Common causes include missing the first or last characters, pasting a line break, or deleting the space between `Bearer` and the token.

If the token has been exposed publicly, delete the old token and create a new one.

### What if my balance does not appear after payment?

Refresh the console, confirm that you are logged in to the correct account, and wait briefly for balance synchronization. Top-up rate: `1 CNY = 1 USD credit`.

If the balance still does not appear, keep the order number, payment time, amount, and account information, then contact support.

### What if API requests time out?

Timeouts are often related to network conditions, request size, model response time, or client timeout settings. Check in this order:

1. Confirm that the Base URL is correct.
2. Reduce `max_tokens` or shorten the input, then retry.
3. Increase the client timeout.
4. Add retries with backoff for temporary failures.
5. If only one model times out, try another available model to compare.

## Support {#support}

Support contact to be added. When contacting support, include the request time, error message, request type, payment status, and a redacted request ID or log snippet when possible.
