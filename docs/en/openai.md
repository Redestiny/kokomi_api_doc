# OpenAI-Compatible API

Kokomi-api provides an OpenAI-compatible API. Most OpenAI clients that support a custom Base URL only need a different `base_url` and API key.

## Basic information

| Item | Value |
| --- | --- |
| Base URL | `https://kokomi-api.cc/v1` |
| API key | Create one in [API key management](https://kokomi-api.cc/console/token) |
| Auth header | `Authorization: Bearer <KOKOMI_API_KEY>` |
| Example endpoint | `/chat/completions` |

## curl example

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

## Python example

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

You can also configure environment variables:

```bash
export OPENAI_API_KEY="<KOKOMI_API_KEY>"
export OPENAI_BASE_URL="https://kokomi-api.cc/v1"
```

## JavaScript example

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

## Client configuration notes

- Use `https://kokomi-api.cc/v1` as the Base URL.
- Use the token from the Kokomi-api console as your API key.
- Fill `<model>` with an actual model name available to your account.
- If your client automatically appends `/v1`, do not configure `/v1/v1`.

## Common errors

| Symptom | What to check |
| --- | --- |
| `401` or auth failure | Confirm the token was copied completely and the header is `Authorization: Bearer <KOKOMI_API_KEY>` |
| `404` | Check that the Base URL is `https://kokomi-api.cc/v1` and the path is `/chat/completions` |
| Request timeout | Check the network, reduce request complexity, increase the client timeout, and retry if needed |
