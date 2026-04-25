# Quick Start

This page walks you through your first Kokomi-api request. You need an account, a valid API key, and the model name you want to call.

## 1. Register an account

Open the [registration page](https://kokomi-api.cc/register) and create an account. After registration, open the [console](https://kokomi-api.cc).

## 2. Create or copy an API key

Go to [API key management](https://kokomi-api.cc/console/token), create a token, and copy it completely.

Before using it, confirm that:

- There are no extra spaces or line breaks before or after the token.
- OpenAI-compatible requests use `Authorization: Bearer <KOKOMI_API_KEY>`.
- You do not commit the token to public repositories, frontend code, or screenshots.

## 3. Check your balance

Confirm that your console balance is available. Top-up rate: `1 CNY = 1 USD credit`.

If the balance does not appear immediately after payment, refresh the console and wait briefly. If it still does not recover, keep the order details and contact support. Support contact to be added.

## 4. Send your first request

The OpenAI-compatible Base URL is:

```text
https://kokomi-api.cc/v1
```

You can test it with curl:

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

The Claude/Anthropic-compatible Base URL is:

```text
https://kokomi-api.cc
```

Test it with:

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

## Next steps

- Read the [OpenAI-compatible guide](/en/openai) for OpenAI SDK, Python, and JavaScript usage.
- Read the [Claude/Anthropic-compatible guide](/en/claude) for Claude ecosystem clients and SDKs.
- Check the [FAQ](/en/faq) when something does not work as expected.
