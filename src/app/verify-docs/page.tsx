"use client";

import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { randomString } from "@/lib/utils";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
}

const Chat2 = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const uniqueId = randomString(5);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const sendMessage = async () => {
    if (input.trim() === "") return;
    if (!file) {
      alert("Please upload a PDF file first");
      return;
    }

    const userMessage: Message = {
      id: messages.length,
      text: input,
      sender: "user",
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");

    try {
      const formData = new FormData();
      formData.append("query", input);
      formData.append("uniqueId", uniqueId);
      if (file) {
        formData.append("pdf", file);
      }
      setIsLoading(true);
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: messages.length + 1, text: "Typing...", sender: "ai" },
      ]);
      const response = await fetch("/api/chatbot2", {
        method: "POST",
        body: formData,
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
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, prevMessages.length - 1),
      ]);
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, prevMessages.length - 1),
      ]);
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: messages.length + 1, text: "Something went wrong", sender: "ai" },
      ]);
      console.error("Error fetching AI response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto flex h-[95dvh] max-w-3xl flex-col p-4">
      <div className="mb-4">
        <Label htmlFor="file" className="text-sm font-medium">
          Upload PDF
        </Label>
        <Input
          id="file"
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="mt-1"
        />
      </div>
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
          className="rounded-r-lg bg-blue-500 p-2 text-white disabled:cursor-not-allowed disabled:bg-blue-300"
          disabled={isLoading}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat2;
