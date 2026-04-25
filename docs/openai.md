# OpenAI 兼容接口

Kokomi-api 提供 OpenAI 兼容接口。大多数支持自定义 Base URL 的 OpenAI 客户端，只需要替换 `base_url` 和 API Key。

## 基础信息

| 项目 | 值 |
| --- | --- |
| Base URL | `https://kokomi-api.cc/v1` |
| API Key | 在 [API Key 管理页](https://kokomi-api.cc/console/token) 创建 |
| 鉴权 Header | `Authorization: Bearer <KOKOMI_API_KEY>` |
| 示例接口 | `/chat/completions` |

## curl 示例

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

## Python 示例

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

也可以使用环境变量：

```bash
export OPENAI_API_KEY="<KOKOMI_API_KEY>"
export OPENAI_BASE_URL="https://kokomi-api.cc/v1"
```

## JavaScript 示例

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

## 客户端配置要点

- Base URL 填写 `https://kokomi-api.cc/v1`。
- API Key 使用 Kokomi-api 控制台中的令牌。
- 模型名称按你的实际可用模型填写为 `<model>`。
- 如果客户端已经自动补全 `/v1`，请不要重复填写 `/v1/v1`。

## 常见错误

| 现象 | 检查项 |
| --- | --- |
| `401` 或鉴权失败 | 确认令牌完整复制，并且 Header 是 `Authorization: Bearer <KOKOMI_API_KEY>` |
| `404` | 检查 Base URL 是否为 `https://kokomi-api.cc/v1`，路径是否为 `/chat/completions` |
| 请求超时 | 检查网络、降低请求复杂度、增加客户端超时时间，并按需重试 |
