"use client";

import Message from "./Message";
import { ThreeDotLoading } from "./ThreeDotLoading";
import { getMessageObject } from "@/utilities/messageUtils";
import { useRecoilState } from "recoil";
import { messagesAtom } from "@/store/atoms/chatAtoms";
import { DemoCards } from "./DemoCards";
import { SwapWidget } from "./jupiter/Swap";
import SystemMesage from "./SystemMessage";
import BrianAsk from "@/components/Brian/BrianAsk";

function EmptyChat() {
  return (
    <div className="mx-auto mt-12">
      <div className="font-semibold max-w-md text-xl text-left pt-8 px-2">
        Hello! I am{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-500">
          Bitbirdie
        </span>{" "}
        but you can call me Birdie ;)
      </div>

      <div className="font-semibold max-w-md text-xl text-left py-1 px-2">
        Here to assist with any questions or guidance you may need
      </div>
    </div>
  );
}

export function MessageRouter({ message, index }) {
  // console.log("message", message)
  if (message.role == "assistant") {
    const messageJson = JSON.parse(message.content);
    console.log("Message content", messageJson);
    if (messageJson.action === "swap") {
      return (
        <SystemMesage>
          <SwapWidget
            from={messageJson.tokenFrom}
            to={messageJson.tokenTo}
            fromAmount={messageJson.amountIn}
          />
        </SystemMesage>
      );
    }

    if (messageJson.action === "brian_ask") {
      return (
        <SystemMesage>
          <BrianAsk message_details={messageJson.details} />
        </SystemMesage>
      );
    }
  }
  // const messageJson = JSON.parse(message)
  // console.log(messageJson)

  return (
    <Message
      key={index}
      message={message}
      userName="User"
      aiName="BitBirdie"
      userAvatar="/user_logo.png"
      aiAvatar="/bitbirdie_logo.jpeg"
    />
  );
}

export function Chat({ isLoading, isError, isLoggedIn }) {
  const [messages, setMessages] = useRecoilState(messagesAtom);

  function handleCardClick(prompt: string) {
    setMessages((prevMessages) => [getMessageObject(prompt, false)]);
  }

  return (
    <div className="flex flex-col justify-between mx-auto min-h-full w-full max-w-2xl">
      <div className="flex flex-col">
        {messages.length === 0 && !isLoading && !isError && isLoggedIn && (
          <EmptyChat />
        )}
        {messages.length === 0 && !isLoading && !isError && !isLoggedIn && (
          <div className="text-gray-500 text-center py-8  mx-auto">
            You need to log in to continue the conversation. Please log in to
            access the chat and interact with me.
          </div>
        )}
        {messages.map((message, index) => (
          <MessageRouter message={message} index={index} />
        ))}

        {isLoading && <ThreeDotLoading />}
        {isError && <div>Error loading messages</div>}
      </div>

      {messages.length === 0 && !isLoading && !isError && isLoggedIn && (
        <DemoCards onCardClick={handleCardClick} />
      )}
    </div>
  );
}
