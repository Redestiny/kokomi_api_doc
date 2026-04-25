# Claude/Anthropic-Compatible API

Kokomi-api provides a Claude/Anthropic-compatible API for SDKs, scripts, and clients that support an Anthropic Base URL.

## Basic information

| Item | Value |
| --- | --- |
| Base URL | `https://kokomi-api.cc` |
| API key | Create one in [API key management](https://kokomi-api.cc/console/token) |
| Auth header | `x-api-key: <KOKOMI_API_KEY>` |
| Version header | `anthropic-version: 2023-06-01` |
| Example endpoint | `/v1/messages` |

## curl example

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

## Environment variables

Many Claude ecosystem tools read Anthropic-style environment variables:

```bash
export ANTHROPIC_API_KEY="<KOKOMI_API_KEY>"
export ANTHROPIC_BASE_URL="https://kokomi-api.cc"
```

If your tool uses different variable names, follow that tool's configuration guide. The core values remain the same: use `https://kokomi-api.cc` as the Base URL and your Kokomi-api token as the API key.

## Python example

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

## JavaScript example

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

## Configuration notes

- Use `https://kokomi-api.cc` as the Base URL and `/v1/messages` as the request path.
- Include both `x-api-key` and `anthropic-version` headers.
- Fill `<model>` with an actual model name available to your account.
- If your client asks for a full endpoint, use `https://kokomi-api.cc/v1/messages`.
