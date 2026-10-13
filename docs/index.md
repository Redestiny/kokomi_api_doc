---
title: Kokomi-api 文档
description: Kokomi-api 多协议接入、模型分组与客户端配置文档
aside: false
outline: false
prev: false
next: false
---

# Kokomi-api 文档

Kokomi-api 基于 New API 提供统一 API 网关，支持 OpenAI Chat Completions、Responses、Anthropic Messages 和 Gemini 接口，可用于 Codex、Claude Code、Cherry Studio、CC Switch 和支持自定义 Base URL 的 SDK 或客户端。具体可用协议取决于所选模型和令牌分组。

## 接入信息 {#integration-details}

| 项目 | 地址 |
| --- | --- |
| 官网 | [https://kokomi-api.cc](https://kokomi-api.cc) |
| 控制台 | [https://kokomi-api.cc/dashboard](https://kokomi-api.cc/dashboard) |
| 注册 | [https://kokomi-api.cc/sign-up](https://kokomi-api.cc/sign-up) |
| 模型广场 | [https://kokomi-api.cc/pricing](https://kokomi-api.cc/pricing) |
| OpenAI API Base URL（Chat / Responses） | `https://kokomi-api.cc/v1` |
| Anthropic API Base URL | `https://kokomi-api.cc` |
| Gemini API 服务地址 | `https://kokomi-api.cc` |

模型、分组、协议支持和价格可能调整。调用前请在[模型广场](https://kokomi-api.cc/pricing)确认模型名称、可用端点和当前价格，不要依赖文档中的固定模型清单或换算比例。

## 模型、分组与价格 {#models-and-pricing}

在[模型广场](https://kokomi-api.cc/pricing)搜索模型，按供应商、分组或端点筛选。卡片显示模型名称、可用分组、端点和价格；点击「详情」可以查看「概览」「性能」「API」。

### 当前模型与分组

以下为 **2026-10-13** 核对的公开页面快照，仅用于帮助识别名称；新增、下线、权限及价格以网站当前展示为准。

| 模型名称 | 页面显示的分组 | 页面显示的端点 |
| --- | --- | --- |
| `gpt-6-astra`、`gpt-6-luna`、`gpt-6-sol`、`gpt-6.1-sol` | Codex、ChatGPT-Pro | Chat、Response |
| `claude-haiku-5-5`、`claude-opus-4-6`、`claude-opus-5-5`、`claude-sonnet-4-6`、`claude-sonnet-5-5` | Claude-MAX、ClaudeCode | Anthropic、Chat |
| `claude-fable-5-1` | Claude-MAX | Anthropic、Chat |
| `gemini-3.8-flash` | Antigravity | Gemini、Chat |

这些名称是本站调用标识。请使用「复制模型名称」得到的完整字符串，不要自行改写版本号、连字符或添加提供商前缀。分组是令牌的路由与计费选择，不是请求 JSON 中的 `model` 值；令牌可选分组以登录后的控制台为准。

### 如何读价格

- 先选择分组，再核对输入、输出、缓存读取及缓存写入的价格；同一模型在不同分组下可能不同。
- 模型广场可切换「标准 / 充值」显示模式及 `/1M /1K` Token 单位。比较价格时应保持相同模式、单位和分组。
- 标有「动态计费」的模型请打开详情查看分档价格及适用条件，不要把卡片上的单个价格当作所有请求的固定价格。
- 「性能」展示近期统计；没有数据不等于模型不可用，历史成功率和延迟也不代表本次请求的保证。

## 协议选择 {#protocol-selection}

| 模型广场端点标识 | 接口 | 完整请求路径 | 请求主字段 |
| --- | --- | --- | --- |
| Chat / `openai` | OpenAI Chat Completions | `POST /v1/chat/completions` | `messages` |
| Response / `openai-response` | OpenAI Responses | `POST /v1/responses` | `input` |
| Anthropic / `anthropic` | Anthropic Messages | `POST /v1/messages` | `messages`、`max_tokens` |
| Gemini / `gemini` | Gemini GenerateContent | `POST /v1beta/models/{model}:generateContent` | `contents` |

上表路径均相对于 `https://kokomi-api.cc`。SDK 的 Base URL 与完整 HTTP 请求地址不同，按下方各协议示例填写。模型详情的「API」标签提供对应模型的调用示例；请求参数也必须与所选协议匹配。

## 快速开始 {#quick-start}

### 1. 注册并登录

在[注册页](https://kokomi-api.cc/sign-up)创建账号，然后进入[控制台](https://kokomi-api.cc/dashboard)。已有账号可直接从[登录页](https://kokomi-api.cc/sign-in)登录。

### 2. 创建 API Key

登录控制台后，进入「令牌」页面创建 API Key，选择可用分组并完整复制令牌。如设置了模型限制、IP 限制或额度，请确认本次调用在允许范围内。API Key 用于 API 鉴权：

- 令牌前后不要带空格或换行。
- 不要把令牌提交到仓库、前端代码、聊天记录或截图中。
- 如果令牌已经泄露，请立即在控制台中删除并重新创建。

### 3. 选择模型

在[模型广场](https://kokomi-api.cc/pricing)复制模型名称，并确认该模型支持你要使用的端点。Codex 使用支持 Responses API 的模型；Claude Code 使用支持 Anthropic 端点的 Claude 模型。普通聊天客户端通常使用 Chat Completions；Google 原生格式的客户端使用 Gemini 端点。

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

## OpenAI Chat Completions {#openai-chat-completions}

适用于模型广场标有 `Chat` / `openai` 的模型，以及使用 OpenAI 兼容聊天接口的客户端。先按快速开始设置 `KOKOMI_API_KEY`，并把 `<model>` 替换为所选模型名称。

### curl 示例

```bash
curl https://kokomi-api.cc/v1/chat/completions \
  -H "Authorization: Bearer $KOKOMI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "<model>",
    "messages": [{"role": "user", "content": "Say hello from Kokomi-api."}]
  }'
```

### Python 示例

安装 SDK：`pip install openai`。

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

响应文本通常位于 `choices[0].message.content`。需要流式输出时在请求体中加入 `"stream": true`，并让客户端按 SSE 解析响应。

## OpenAI Responses API {#openai-responses-api}

Responses 是 Codex 使用的协议。在模型广场选择标有 `Response` / `openai-response` 的模型，并确认令牌分组可以访问。支持 Chat Completions 不代表同时支持 Responses。

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

安装 SDK：`pip install openai`。

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

安装 SDK：`npm install openai`。

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

Claude Code 和 Anthropic SDK 使用 Anthropic 兼容接口。它与 OpenAI 接口使用不同协议，不要混用请求路径或请求体。

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

安装 SDK：`pip install anthropic`。

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

安装 SDK：`npm install @anthropic-ai/sdk`。

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

## Gemini 原生接口 {#gemini-api}

适用于模型广场标有 `Gemini` / `gemini` 的模型。使用 Google 格式的 `contents` 和 `parts`，服务地址为 `https://kokomi-api.cc`。

先设置 `KOKOMI_API_KEY`，把 `<model>` 替换为支持 Gemini 端点的完整模型名称：

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

响应文本位于 `candidates[].content.parts[].text`。此示例把密钥放在请求 Header 中；不要将带真实密钥的查询 URL 分享到日志或截图里。同一 Gemini 模型若也标有 Chat，可按上面的 Chat Completions 示例调用，但请求体和响应结构随协议变化。

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
- 已有配置请合并上述字段，避免重复定义同名 TOML 表。`model_reasoning_effort` 是可选项，须由所选模型支持。
- 此方案通过 `env_key` 读取令牌；无需改写 `auth.json` 或添加与接入无关的权限设置。
- 提供方字段可参考 [Codex 官方配置说明](https://developers.openai.com/codex/config-reference/)。

## Claude Code 配置 {#claude-code-configuration}

Claude Code 通过 Anthropic 兼容接口接入。先在当前终端设置：

```bash
export ANTHROPIC_API_KEY="<KOKOMI_API_KEY>"
export ANTHROPIC_BASE_URL="https://kokomi-api.cc"
export ANTHROPIC_MODEL="<model>"

claude
```

需要持久化时，可以把 `env` 合并到现有用户级 `~/.claude/settings.json`，保留其他设置：

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

## 常用客户端 {#client-configuration}

官网提供了 [Cherry Studio](https://cherry-ai.com) 和 [CC Switch](https://ccswitch.io) 入口。手动接入时按客户端所需协议填写：

| 客户端 / 用途 | 接口类型 | 服务地址 | 模型要求 |
| --- | --- | --- | --- |
| Cherry Studio 等 OpenAI 兼容聊天客户端 | Chat Completions | `https://kokomi-api.cc/v1` | 支持 Chat |
| Codex / CC Switch 的 Codex 配置 | Responses | `https://kokomi-api.cc/v1` | 支持 Response |
| Claude Code / CC Switch 的 Claude Code 配置 | Anthropic | `https://kokomi-api.cc` | 支持 Anthropic |
| Google 格式的 Gemini 客户端 | Gemini | `https://kokomi-api.cc`（原生路径从 `/v1beta` 开始） | 支持 Gemini |

填写 Kokomi-api 的令牌，再复制模型广场的完整模型名称。如果客户端自动补 `/v1`，检查最终请求地址，避免重复成 `/v1/v1/...`。不同客户端对服务地址的拼接规则可能不同，以其预览的最终路径及模型详情中的「API」示例为准。

## 常见问题 {#faq}

### Chat 和 Responses 应该选哪一个？

根据客户端及模型广场中的端点选择：普通 OpenAI 兼容聊天客户端通常使用 `/v1/chat/completions`，Codex 使用 `/v1/responses`。Chat 使用 `messages`，Responses 使用 `input`。请求失败时先检查模型、端点及令牌分组，不要只修改 URL 而保留另一套协议的请求体。

### 为什么 Codex 仍然要求登录 OpenAI？

确认 `model_provider` 指向上面的 `kokomi-api` 自定义提供方，并设置了 `KOKOMI_API_KEY`。不要在该提供方中设置 `requires_openai_auth = true`，也不要依赖 `~/.codex/auth.json` 保存 Kokomi-api 令牌。

### 收到 `401` 或 `403` 怎么办？

确认令牌完整且未失效、环境变量已在启动客户端的同一个终端中设置，并检查账号是否有权访问所选模型。日志和截图中不要包含完整令牌。

### 收到模型不存在或无可用渠道怎么办？

先从模型广场重新复制名称，确认所选端点可用；再检查令牌分组、模型限制和账户额度。模型卡片公开可见不代表每个令牌都有调用权限。不要用分组名称替代模型名称。

### 为什么卡片价格和实际扣费不同？

检查「标准 / 充值」模式、Token 单位、实际使用的分组，以及动态计费档位、输出和缓存读写用量。以模型详情的当前定价和控制台消费记录为准。

### API 请求超时怎么办？

先确认 Base URL、端点和模型名称正确，再缩短输入、降低最大输出长度或增加客户端超时。对临时网络错误可以使用有限次数的指数退避重试；如果只有一个模型异常，请在模型广场选择同协议的其他模型交叉验证。

## 支持 {#support}

请以[Kokomi-api 官网](https://kokomi-api.cc)当前公布的公告和支持渠道为准。反馈问题时请提供请求时间、请求端点、模型名称、HTTP 状态码，以及脱敏后的请求 ID 或日志片段；不要提交完整 API Key。
