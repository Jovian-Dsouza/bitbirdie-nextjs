export const testBrainAsk = { role: "assistant", content: "{\"action\": \"brian_ask\", \"details\": \"Hi there whats up \"}" }
export const testLimitOrder = {
  role: "assistant",
  content: '{"action": "limit_order", "tokenFrom": "sol", "tokenTo": "usdc", "amountIn": "0.001", "amountOut": "175"}',
};
export const testGetPrice = {
  role: "assistant",
  content:
    '{"action": "get_price", "tokenFrom": "sol", "tokenTo": "usdc"}',
};