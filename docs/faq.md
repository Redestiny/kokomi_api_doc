# 常见问题

## 令牌复制不完整怎么办？

请回到 [API Key 管理页](https://kokomi-api.cc/console/token)，重新复制完整令牌。常见问题包括少复制了开头或结尾、粘贴时带入换行、把 `Bearer` 和令牌之间的空格删掉。

OpenAI 兼容请求应使用：

```text
Authorization: Bearer <KOKOMI_API_KEY>
```

Claude/Anthropic 兼容请求应使用：

```text
x-api-key: <KOKOMI_API_KEY>
```

如果你已经把令牌暴露到公开位置，建议立即删除旧令牌并创建新令牌。

## 充值后余额未显示怎么办？

请先刷新控制台，确认登录账号是否正确，并等待余额同步完成。充值比例为 `1¥ = 1$`。

如果长时间仍未显示，请保留订单号、充值时间、充值金额和账号信息，再联系支持。支持联系方式待补充。

## API 请求超时怎么办？

请求超时通常和网络、请求体大小、模型响应耗时或客户端超时设置有关。可以按下面顺序排查：

1. 确认 Base URL 是否填写正确。
2. 降低 `max_tokens` 或缩短输入内容后重试。
3. 增加客户端 timeout。
4. 对临时失败增加重试和退避。
5. 如果只有某个模型超时，尝试换用其他可用模型验证。

OpenAI 兼容 Base URL：

```text
https://kokomi-api.cc/v1
```

Claude/Anthropic 兼容 Base URL：

```text
https://kokomi-api.cc
```

## 支持联系方式是什么？

支持联系方式待补充。联系支持时，请尽量提供请求时间、错误信息、请求类型、是否完成充值，以及脱敏后的请求 ID 或日志片段。
