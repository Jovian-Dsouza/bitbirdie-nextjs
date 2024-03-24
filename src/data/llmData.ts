export const demoPrompts = [
  {
    name: "View Portfolio Action",
    prompt: "Show me my portfolio on the Ethereum network.",
  },
  { name: "Send Action", prompt: "Please send 100 USDT to Alice's wallet." },
  { name: "Swap Action", prompt: "I want to swap 0.5 ETH for 10 SOL." },
  { name: "Order Histry", prompt: "Show me my order history" },
  {
    name: "Information on NFT Action",
    prompt:
      "Can you provide information on the CryptoPunks collection on Ethereum?",
  },
  {
    name: "Information on Stock Markets Action",
    prompt: "What's the current status of AAPL on the NASDAQ?",
  },
  {
    name: "Information on Crypto Markets Action",
    prompt: "I'd like to know about the BTC/USD pair on Binance.",
  },
  {
    name: "Buy NFT Action",
    prompt: "Buy a Bored Ape Yacht Club NFT on Ethereum.",
  },
];

export const basePrompt = `
Your crypto wallet, which parses English text into a JSON response.

Parse the command into a JSON object where each element has exactly 2 fields: 'action' and 'details'. 
'action' must be one of: 'view_portfolio', 'user_details', 'order_history', 'swap', 'send', 'deposit', 'borrow', 'buy_nft', 'undefined'.
For 'details', extract the full corresponding sentence of the command related to the action.

view_portfolio: Translate into a JSON object with 'action'
user_details: Translate into a JSON object with 'action'
order_history: Translate into a JSON object with 'action'
swap: Translate into a JSON object with 'action', 'tokenFrom', 'tokenTo', 'amountIn', and 'amountOut'. 'tokenFrom' and 'tokenTo' are token symbols; 'amountIn' and 'amountOut' represent the amount of 'tokenFrom' and 'tokenTo' tokens respectively.
send: Translate into a JSON object with 'action', 'token', 'to', and 'amount'. 'token' is the symbol of the token to send, 'to' is the receiver's address, and 'amount' is the amount of 'token' to send.
deposit: Translate into a JSON object with 'action', 'token', and 'amount'. 'token' is the symbol of the token to deposit, and 'amount' is the amount of 'token' to deposit.
borrow: Translate into a JSON object with 'action', 'token', and 'amount'. 'token' is the symbol of the token to borrow, and 'amount' is the amount of 'token' to borrow.
buy_nft: Translate into a JSON object with 'action' (BuyNFT) and 'details' (the NFT to buy along with the network on which it resides).
undefined: Translate into a JSON object with 'action' and 'details'. 'details' should contain the unprocessed part of the command related to this action.

Output should only contain JSON object. Output should contain only one action. No extra output after JSON object
`;

// export const baseModel = "mistralai/mistral-7b-instruct:free";
// export const baseModel = "google/gemma-7b-it:free";
export const baseModel = "openrouter/cinematika-7b:free";