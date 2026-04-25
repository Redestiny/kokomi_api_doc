# FAQ

## What if the token was not copied completely?

Go back to [API key management](https://kokomi-api.cc/console/token) and copy the complete token again. Common causes include missing the first or last characters, pasting a line break, or deleting the space between `Bearer` and the token.

OpenAI-compatible requests should use:

```text
Authorization: Bearer <KOKOMI_API_KEY>
```

Claude/Anthropic-compatible requests should use:

```text
x-api-key: <KOKOMI_API_KEY>
```

If the token has been exposed publicly, delete the old token and create a new one.

## What if my balance does not appear after payment?

Refresh the console, confirm that you are logged in to the correct account, and wait briefly for balance synchronization. Top-up rate: `1 CNY = 1 USD credit`.

If the balance still does not appear, keep the order number, payment time, amount, and account information, then contact support. Support contact to be added.

## What if API requests time out?

Timeouts are often related to network conditions, request size, model response time, or client timeout settings. Check in this order:

1. Confirm that the Base URL is correct.
2. Reduce `max_tokens` or shorten the input, then retry.
3. Increase the client timeout.
4. Add retries with backoff for temporary failures.
5. If only one model times out, try another available model to compare.

OpenAI-compatible Base URL:

```text
https://kokomi-api.cc/v1
```

Claude/Anthropic-compatible Base URL:

```text
https://kokomi-api.cc
```

## What is the support contact?

Support contact to be added. When contacting support, include the request time, error message, request type, payment status, and a redacted request ID or log snippet when possible.
