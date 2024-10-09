"use client";

import React, { useState, useEffect, useRef } from "react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">Form Data</h2>
        {Object.entries(data).map(([key, value]) => (
          <p key={key} className="mb-2">
            <strong>{key}:</strong> {String(value)}
          </p>
        ))}
        <button
          onClick={onClose}
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [modalData, setModalData] = useState<any>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messageIdCounter = useRef(0);
  const createMessage = (text: string, sender: "user" | "ai"): Message => ({
    id: `${sender}-${messageIdCounter.current++}`,
    text,
    sender,
  });

  useEffect(() => {
    const initialFetch = async () => {
      try {
        const response = await fetch("/api/chatbot3", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: "Hi!" }),
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(
            "Failed to fetch AI response. Please try reloading the page.",
          );
        }
        setMessages([createMessage(responseData.message, "ai")]);
      } catch (error) {
        setMessages([createMessage("Something went wrong.", "ai")]);
        console.error("Error fetching AI response:", error);
      }
    };
    initialFetch();
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = createMessage(input, "user");

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");

    try {
      const response = await fetch("/api/chatbot3", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error("Failed to fetch AI response");
      }
      setMessages((prevMessages) => [
        ...prevMessages,
        createMessage(responseData.message, "ai"),
      ]);
      if (responseData.resData) {
        setModalData(responseData.resData);
      }
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
      <Modal
        isOpen={modalData !== null}
        onClose={() => setModalData(null)}
        data={modalData}
      />
    </div>
  );
};

export default Chat;
