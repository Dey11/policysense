"use client";

import { randomString } from "@/lib/utils";
import { langState } from "@/store/languageState";
import React, { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const uniqueId = randomString(5);
  const [lang, setLang] = useRecoilState(langState);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage: Message = {
      id: messages.length,
      text: input,
      sender: "user",
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");

    try {
      const response = await fetch("/api/chatbot1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input, uniqueId, lang }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error("Failed to fetch AI response");
      }
      const aiMessage: Message = {
        id: messages.length + 1,
        text: responseData.message,
        sender: "ai",
      };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };

  return (
    <div className="no-scrollbar mx-auto flex h-[95dvh] max-w-3xl flex-col p-4">
      <div className="mb-4 flex-1 overflow-y-auto px-2" ref={chatContainerRef}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${
              message.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block rounded-2xl p-2 ${
                message.sender === "user"
                  ? "max-w-xl rounded-br-none bg-white text-blue-500"
                  : "max-w-xl rounded-bl-none bg-blue-500 text-white"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 rounded-l-lg border p-2"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="rounded-r-lg bg-blue-500 p-2 text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
