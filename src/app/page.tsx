"use client";
import { useState } from "react";
import { ChatInput } from "@/components/ChatInput";
import { Chat } from "@/components/Chat";
import Image from "next/image";
import { useEffect, useRef, useContext } from "react";
import { usePlayground } from "@/hooks/usePlayground";

export default function PlaygroundPage({
  params,
}: {
  params: { modelId: string };
}) {
  const [messages, setMessages] = useState([]);
  const [modelList, setModelList] = useState([]);
  const [baseModel, setBaseModel] = useState(
    "mistralai/mistral-7b-instruct:free"
  );

  const [prompt, setPrompt] = useState("");
  const { isLoading, isError, getChatResponse } = usePlayground(
    baseModel,
    prompt
  );

  function addMessage(input, isSystemMessage) {
    setMessages((prevMessages) => [
      ...prevMessages,
      getMessageObject(input, isSystemMessage),
    ]);
  }

  function getMessageObject(input, isSystemMessage) {
    return {
      role: isSystemMessage ? "assistant" : "user",
      content: input,
    };
  }

  const chatRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat when messages change
    if (chatRef.current) {
      chatRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  async function handleChatInput(input) {
    console.log("Chat input: " + input);
    addMessage(input, false);
    try {
      const severMessage = await getChatResponse([
        ...messages,
        getMessageObject(input, false),
      ]);
      // const severMessage = input
      addMessage(severMessage, true);
    } catch (error) {
      console.error("Error handling chat input:", error);
    }
  }

  // Callback function to handle model selection
  const handleModelSelect = (modelId) => {
    // setSelectedModel(modelId);
  };

  // Callback function to handle prompt submission
  const handlePromptSubmit = (promptText) => {
    // setPrompt(promptText); // Update the prompt state or use it as needed
    // You can perform any necessary actions with the prompt text here
    // For example, trigger a chat response
  };

  return (
    <main className="h-screen pt-20">
      <div className="flex h-full">
        <div className="flex flex-col h-full w-full overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <Chat
              messages={messages}
              isLoading={isLoading}
              isError={isError}
              isLoggedIn={true}
            />
          </div>
          <div className="sticky bottom-0 w-full">
            <ChatInput
              onSubmit={handleChatInput}
              isLoading={isLoading}
              isLoggedIn={true}
            />
            <div style={{ float: "left", clear: "both" }} ref={chatRef}></div>
          </div>
        </div>
      </div>
    </main>
  );
}
