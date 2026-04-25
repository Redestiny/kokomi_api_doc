# 快速开始

本页会带你完成 Kokomi-api 的第一次 API 请求。你只需要一个账号、一个可用令牌，以及你准备调用的模型名称。

## 1. 注册账号

打开 [注册入口](https://kokomi-api.cc/register) 创建账号。注册完成后，进入 [控制台](https://kokomi-api.cc)。

## 2. 创建或复制 API Key

进入 [API Key 管理页](https://kokomi-api.cc/console/token)，创建一个令牌并完整复制。

复制后请确认：

- 令牌前后没有多余空格或换行。
- 在请求中使用 `Authorization: Bearer <KOKOMI_API_KEY>`。
- 不要把令牌提交到公开仓库、前端代码或截图中。

## 3. 确认余额

在控制台确认余额可用。充值比例为 `1¥ = 1$`。

如果充值后余额没有立即显示，请刷新控制台并稍等片刻；仍未恢复时，保留订单信息并联系支持。支持联系方式待补充。

## 4. 发送第一次请求

OpenAI 兼容接口的 Base URL 是：

```text
https://kokomi-api.cc/v1
```

可以先用 curl 测试：

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

Claude/Anthropic 兼容接口的 Base URL 是：

```text
https://kokomi-api.cc
```

对应的测试请求：

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

## 下一步

- 查看 [OpenAI 兼容教程](/openai)，接入 OpenAI SDK、Python 或 JavaScript。
- 查看 [Claude/Anthropic 兼容教程](/claude)，接入 Claude 生态客户端和 SDK。
- 遇到问题时先查看 [常见问题](/faq)。
