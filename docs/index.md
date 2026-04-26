---
title: Kokomi-api 文档
description: Kokomi-api API 中转站文档
aside: false
outline: false
prev: false
next: false
---

# Kokomi-api 文档

Kokomi-api 提供 OpenAI 兼容接口和 Anthropic 兼容接口。支持claudecode与codex。

## 接入信息 {#integration-details}

| 项目 | 地址 |
| --- | --- |
| 控制台 | [https://kokomi-api.cc/console](https://kokomi-api.cc/console) |
| 注册 | [https://kokomi-api.cc/register](https://kokomi-api.cc/register) |
| OpenAI 兼容 Base URL | `https://kokomi-api.cc/v1` |
| Anthropic 兼容 Base URL | `https://kokomi-api.cc` |
| 充值比例 | `1¥ = 1$` |

## 快速开始 {#quick-start}

### 1. 注册账号

打开 [注册入口](https://kokomi-api.cc/register) 创建账号。注册完成后，进入 [控制台](https://kokomi-api.cc/console)。

### 2. 创建或复制 API Key

进入 [API Key 管理页](https://kokomi-api.cc/console/token)，创建一个令牌并完整复制。

复制后请确认：

- 令牌前后没有多余空格或换行。
- 令牌格式为 `sk-xxxxxxxxxxxxxx`
- 不要把令牌提交到公开仓库、前端代码或截图中。

### 3. 确认余额

在控制台确认余额可用。充值比例为 `1¥ = 1$`。

如果充值后余额没有立即显示，请刷新控制台并稍等片刻；仍未恢复时，保留订单信息并联系支持。支持联系方式待补充。

### 4. 发送第一次请求

OpenAI 兼容接口的测试请求：

```bash
curl https://kokomi-api.cc/v1/chat/completions \
  -H "Authorization: Bearer <KOKOMI_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "<model>",
    "messages": [
      {
        "role": "user",
        "content": "你好，请用一句话介绍 Kokomi-api。"
      }
    ]
  }'
```

Anthropic 兼容接口的测试请求：

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
        "content": "你好，请用一句话介绍 Kokomi-api。"
      }
    ]
  }'
```

## OpenAI 兼容接口 {#openai-compatible-api}

大多数支持自定义 Base URL 的 OpenAI 客户端，只需要替换 `base_url` 和 API Key。

### 基础信息

| 项目 | 值 |
| --- | --- |
| Base URL | `https://kokomi-api.cc/v1` |
| API Key | 在 [API Key 管理页](https://kokomi-api.cc/console/token) 创建 |
| 鉴权 Header | `Authorization: Bearer <KOKOMI_API_KEY>` |
| 示例接口 | `/chat/completions` |

### curl 示例

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

### Python 示例

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

### JavaScript 示例

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

### 配置要点

- Base URL 填写 `https://kokomi-api.cc/v1`。
- API Key 使用 Kokomi-api 控制台中的令牌。
- 模型名称按你的实际可用模型填写为 `<model>`。
- 如果客户端已经自动补全 `/v1`，请不要重复填写 `/v1/v1`。

## Anthropic 兼容接口 {#claude-anthropic-compatible-api}

Claude/Anthropic 兼容接口适合支持 Anthropic Base URL 配置的 SDK、脚本和客户端。

### 基础信息

| 项目 | 值 |
| --- | --- |
| Base URL | `https://kokomi-api.cc` |
| API Key | 在 [API Key 管理页](https://kokomi-api.cc/console/token) 创建 |
| 鉴权 Header | `x-api-key: <KOKOMI_API_KEY>` |
| 版本 Header | `anthropic-version: 2023-06-01` |
| 示例接口 | `/v1/messages` |

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

### 环境变量示例

```bash
export ANTHROPIC_API_KEY="<KOKOMI_API_KEY>"
export ANTHROPIC_BASE_URL="https://kokomi-api.cc"
```

如果你的工具使用不同的变量名，请以该工具的配置说明为准，核心保持一致：Base URL 使用 `https://kokomi-api.cc`，API Key 使用 Kokomi-api 令牌。

### Python 示例

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

### 配置要点

- Base URL 填写 `https://kokomi-api.cc`，请求路径为 `/v1/messages`。
- Header 中必须包含 `x-api-key` 和 `anthropic-version`。
- 模型名称按你的实际可用模型填写为 `<model>`。
- 如果客户端要求填写完整 endpoint，请使用 `https://kokomi-api.cc/v1/messages`。

## Codex 配置 {#codex-configuration}

本节用于把 Kokomi-api 配置到 Codex 中。示例继续使用 `<KOKOMI_API_KEY>` 和 `<model>` 占位，请替换为你控制台中的令牌和实际可用模型。

在.codex文件夹创建（编辑）以下两个文件：

Codex 配置文件 `~/.codex/config.toml`：
```toml
model_provider = "kokomi-api"
model = "gpt-5.5"
model_reasoning_effort = "high"
network_access = "enabled"
disable_response_storage = true

[model_providers.kokomi-api]
name = "kokomi-api"
base_url = "https://kokomi-api.cc/v1"
wire_api = "responses"
requires_openai_auth = true
```

`~/.codex/auth.json`：
```json
{
  "OPENAI_API_KEY": "sk-xxxxxxxxxxxxxxxx"
}
```

注意事项：

- Codex 的 Base URL 填写 `https://kokomi-api.cc/v1`。
- `OPENAI_API_KEY` 使用 Kokomi-api 控制台中的令牌。
- 不要把 API Key 写入项目仓库或公开配置文件。
- 如果出现 `/responses`、模型能力或鉴权相关错误，请确认你的账号、模型和当前工具版本是否支持对应的 OpenAI 兼容能力。

## Claude Code 配置 {#claude-code-configuration}

Claude Code 使用 Anthropic 兼容接口。

配置位置： `~/.claude/settings.json`：

```json
{
  "env": {
    "ANTHROPIC_API_KEY": "sk-xxxxxxxxxxxxxxxx",
    "ANTHROPIC_BASE_URL": "https://kokomi-api.cc",
    "API_TIMEOUT_MS": "600000"
  }
}
```
如果卡在登录页请在`~/.claude.json`中添加`hasCompletedOnboarding`参数：
```json
{
  "hasCompletedOnboarding": true
}
```

注意事项：

- Claude Code 的 Base URL 填写 `https://kokomi-api.cc`，不要在这里额外追加 `/v1/messages`。
- 请将 `sk-xxxxxxxxxxxxxxxx` 替换为您在Kokomi-api令牌管理生成的令牌。
- 如果你把 `.claude/settings.json` 放在项目目录中，请不要写入真实 API Key。
- 如果工具提示需要重新登录或仍访问官方地址，请重启终端后再运行 `claude`。

## 常见问题 {#faq}

### 令牌复制不完整怎么办？

请回到 [API Key 管理页](https://kokomi-api.cc/console/token)，重新复制完整令牌。常见问题包括少复制了开头或结尾、粘贴时带入换行、把 `Bearer` 和令牌之间的空格删掉。

如果你已经把令牌暴露到公开位置，建议立即删除旧令牌并创建新令牌。

### 充值后余额未显示怎么办？

请先刷新控制台，确认登录账号是否正确，并等待余额同步完成。充值比例为 `1¥ = 1$`。

如果长时间仍未显示，请保留订单号、充值时间、充值金额和账号信息，再联系支持。

### API 请求超时怎么办？

请求超时通常和网络、请求体大小、模型响应耗时或客户端超时设置有关。可以按下面顺序排查：

1. 确认 Base URL 是否填写正确。
2. 降低 `max_tokens` 或缩短输入内容后重试。
3. 增加客户端 timeout。
4. 对临时失败增加重试和退避。
5. 如果只有某个模型超时，尝试换用其他可用模型验证。

## 支持 {#support}

支持联系方式待补充。联系支持时，请尽量提供请求时间、错误信息、请求类型、是否完成充值，以及脱敏后的请求 ID 或日志片段。
