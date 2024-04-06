import OpenAI from "openai";
import { brian, askBrian } from "./brian/brianApi";
import { basePrompt, baseModel } from "@/data/llmData";

export const openRouter = new OpenAI({
  baseURL: process.env.OPENROUTER_BASE_URL,
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL, // Optional, for including your app on openrouter.ai rankings.
    "X-Title": process.env.NEXT_PUBLIC_APP_TITLE, // Optional. Shows in rankings on openrouter.ai.
  },
});

function filterResponse(inputText) {
  try {
    const startIndex = inputText.indexOf("{");
    const endIndex = inputText.lastIndexOf("}") + 1;
    const jsonString = inputText.substring(startIndex, endIndex);
    const jsonObject = JSON.parse(jsonString);
    return jsonObject
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
  return {"action" : "undefined"};
}

export async function getChatResponse(messages) {
  const messagesWithPrompt = [{ role: "system", content: basePrompt }, ...messages];
  // if (basePrompt) {
  //   messages.unshift({ role: "system", content: basePrompt });
  // }
  console.log("messages with prompt", messagesWithPrompt)
  const completion = await openRouter.chat.completions.create({
    messages: messagesWithPrompt,
    model: baseModel,
  });
  const response = filterResponse(completion.choices[0].message.content)
  console.log(response)
  if(response["action"] === "undefined"){
    console.log("Undefined action")
    const brainResponse = await askBrian(messages);
    console.log(brainResponse)
    return {
      "action": "brain_ask", 
      "details": brainResponse
    }
  }
  return response
}
