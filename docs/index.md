---
title: Kokomi-api 文档
description: Kokomi-api 原生 Responses API 与 Anthropic 兼容接口文档
aside: false
outline: false
prev: false
next: false
---

# Kokomi-api 文档

Kokomi-api 基于 New API 提供 OpenAI 原生 Responses API 和 Anthropic 兼容接口，可用于 Codex、Claude Code、SDK 和支持自定义 Base URL 的客户端。

## 接入信息 {#integration-details}

| 项目 | 地址 |
| --- | --- |
| 官网 | [https://kokomi-api.cc](https://kokomi-api.cc) |
| 控制台 | [https://kokomi-api.cc/dashboard](https://kokomi-api.cc/dashboard) |
| 注册 | [https://kokomi-api.cc/sign-up](https://kokomi-api.cc/sign-up) |
| 模型广场 | [https://kokomi-api.cc/pricing](https://kokomi-api.cc/pricing) |
| Responses API Base URL | `https://kokomi-api.cc/v1` |
| Anthropic API Base URL | `https://kokomi-api.cc` |

模型、分组、协议支持和价格可能调整。调用前请在[模型广场](https://kokomi-api.cc/pricing)确认模型名称、可用端点和当前价格，不要依赖文档中的固定模型清单或换算比例。

## 快速开始 {#quick-start}

### 1. 注册并登录

在[注册页](https://kokomi-api.cc/sign-up)创建账号，然后进入[控制台](https://kokomi-api.cc/dashboard)。已有账号可直接从[登录页](https://kokomi-api.cc/sign-in)登录。

### 2. 创建 API Key

登录控制台后，进入令牌或 API Key 页面创建令牌并完整复制。令牌只会用于 API 鉴权：

- 令牌前后不要带空格或换行。
- 不要把令牌提交到仓库、前端代码、聊天记录或截图中。
- 如果令牌已经泄露，请立即在控制台中删除并重新创建。

### 3. 选择模型

在[模型广场](https://kokomi-api.cc/pricing)复制模型名称，并确认该模型支持你要使用的端点。Codex 使用支持 Responses API 的 OpenAI 模型；Claude Code 使用支持 Anthropic 端点的 Claude 模型。

### 4. 发送第一个 Responses 请求

```bash
export KOKOMI_API_KEY="<KOKOMI_API_KEY>"

curl https://kokomi-api.cc/v1/responses \
  -H "Authorization: Bearer $KOKOMI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "<model>",
    "input": "你好，请用一句话介绍 Kokomi-api。"
  }'
```

成功响应中的文本位于 `output` 数组；使用官方 OpenAI SDK 时可直接读取 `response.output_text`。

## OpenAI Responses API {#openai-responses-api}

Kokomi-api 的 OpenAI 接入以原生 Responses API 为准。旧版 `POST /v1/chat/completions` 示例不适用于仅开放 Responses 端点的模型或分组。

### 基础信息

| 项目 | 值 |
| --- | --- |
| Base URL | `https://kokomi-api.cc/v1` |
| Endpoint | `POST /responses` |
| 完整地址 | `https://kokomi-api.cc/v1/responses` |
| 鉴权 Header | `Authorization: Bearer <KOKOMI_API_KEY>` |
| 请求输入 | `input` |

### curl 示例

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

### Python 示例

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

### JavaScript 示例

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

### 配置要点

- SDK 的 Base URL 填写 `https://kokomi-api.cc/v1`，SDK 会自动追加 `/responses`。
- 直接发送 HTTP 请求时，使用完整地址 `https://kokomi-api.cc/v1/responses`。
- 请求体使用 Responses API 的 `input`，不要继续发送 Chat Completions 的 `messages` 请求体。
- 模型名称必须与模型广场显示的名称完全一致，并且支持 Responses 端点。

## Anthropic 兼容接口 {#anthropic-compatible-api}

Claude Code 和 Anthropic SDK 使用 Anthropic 兼容接口。它与 Responses API 是两套独立协议，不要混用请求路径或请求体。

### 基础信息

| 项目 | 值 |
| --- | --- |
| Base URL | `https://kokomi-api.cc` |
| Endpoint | `POST /v1/messages` |
| 鉴权 Header | `x-api-key: <KOKOMI_API_KEY>` |
| 版本 Header | `anthropic-version: 2023-06-01` |

### curl 示例

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

### Python 示例

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

### JavaScript 示例

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

## Codex 配置 {#codex-configuration}

Codex 通过原生 Responses API 接入。API Key 使用专用环境变量，不需要修改 `~/.codex/auth.json`，也不要为这个自定义提供方启用 `requires_openai_auth`。

先设置 API Key：

```bash
export KOKOMI_API_KEY="<KOKOMI_API_KEY>"
```

编辑用户级配置 `~/.codex/config.toml`：

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

保存后启动 Codex：

```bash
codex
```

注意事项：

- `wire_api = "responses"` 会让 Codex 调用 `POST /v1/responses`。
- `model_providers` 属于用户级提供方配置，请放在 `~/.codex/config.toml`，不要只写入项目的 `.codex/config.toml`。
- `<model>` 必须替换为模型广场中支持 Responses 的实际模型名称。
- 旧配置中的 `openai_base_url`、`requires_openai_auth = true`、`~/.codex/auth.json` 和顶层 `network_access` 不适用于此自定义提供方配置。

## Claude Code 配置 {#claude-code-configuration}

Claude Code 通过 Anthropic 兼容接口接入。先在当前终端设置：

```bash
export ANTHROPIC_API_KEY="<KOKOMI_API_KEY>"
export ANTHROPIC_BASE_URL="https://kokomi-api.cc"
export ANTHROPIC_MODEL="<model>"

claude
```

需要持久化时，可以编辑用户级 `~/.claude/settings.json`：

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

注意事项：

- Base URL 只填写 `https://kokomi-api.cc`，不要追加 `/v1/messages`。
- `<model>` 必须替换为模型广场中支持 Anthropic 端点的实际模型名称。
- 配置变更后，请重新启动终端中的 `claude` 进程。
- 不要把包含真实 API Key 的设置文件提交到项目仓库。

## 常见问题 {#faq}

### 为什么 `/v1/chat/completions` 不可用？

当前 OpenAI 接入以原生 Responses API 为准。请把请求地址改为 `/v1/responses`，并把 Chat Completions 的 `messages` 请求体改为 Responses API 的 `input`。

### 为什么 Codex 仍然要求登录 OpenAI？

确认 `model_provider` 指向上面的 `kokomi-api` 自定义提供方，并设置了 `KOKOMI_API_KEY`。不要在该提供方中设置 `requires_openai_auth = true`，也不要依赖 `~/.codex/auth.json` 保存 Kokomi-api 令牌。

### 收到 `401` 或 `403` 怎么办？

确认令牌完整且未失效、环境变量已在启动客户端的同一个终端中设置，并检查账号是否有权访问所选模型。日志和截图中不要包含完整令牌。

### API 请求超时怎么办？

先确认 Base URL、端点和模型名称正确，再缩短输入、降低最大输出长度或增加客户端超时。对临时网络错误可以使用有限次数的指数退避重试；如果只有一个模型异常，请在模型广场选择同协议的其他模型交叉验证。

## 支持 {#support}

请以[Kokomi-api 官网](https://kokomi-api.cc)当前公布的公告和支持渠道为准。反馈问题时请提供请求时间、请求端点、模型名称、HTTP 状态码，以及脱敏后的请求 ID 或日志片段；不要提交完整 API Key。
