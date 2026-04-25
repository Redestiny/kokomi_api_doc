# Claude/Anthropic 兼容接口

Kokomi-api 提供 Claude/Anthropic 兼容接口。适合支持 Anthropic Base URL 配置的 SDK、脚本和客户端。

## 基础信息

| 项目 | 值 |
| --- | --- |
| Base URL | `https://kokomi-api.cc` |
| API Key | 在 [API Key 管理页](https://kokomi-api.cc/console/token) 创建 |
| 鉴权 Header | `x-api-key: <KOKOMI_API_KEY>` |
| 版本 Header | `anthropic-version: 2023-06-01` |
| 示例接口 | `/v1/messages` |

## curl 示例

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

## 环境变量示例

许多 Claude 生态工具会读取 Anthropic 风格的环境变量：

```bash
export ANTHROPIC_API_KEY="<KOKOMI_API_KEY>"
export ANTHROPIC_BASE_URL="https://kokomi-api.cc"
```

如果你的工具使用不同的变量名，请以该工具的配置说明为准，核心保持一致：Base URL 使用 `https://kokomi-api.cc`，API Key 使用 Kokomi-api 令牌。

## Python 示例

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

## JavaScript 示例

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

## 配置要点

- Base URL 填写 `https://kokomi-api.cc`，请求路径为 `/v1/messages`。
- Header 中必须包含 `x-api-key` 和 `anthropic-version`。
- 模型名称按你的实际可用模型填写为 `<model>`。
- 如果客户端要求填写完整 endpoint，请使用 `https://kokomi-api.cc/v1/messages`。
