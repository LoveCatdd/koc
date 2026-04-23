"use client";
import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/utils/auth";
import { websocketService } from "@/services/websocket";
import type { Message } from "@/types";

interface ChatProps {
  gameId: string;
}

export const Chat: React.FC<ChatProps> = ({ gameId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Listen for chat messages
    const handleMessage = (data: any) => {
      if (data.event === "send-message") {
        setMessages((prev) => [...prev, data]);
      }
    };

    websocketService.on("send-message", handleMessage);

    return () => {
      websocketService.off("send-message", handleMessage);
    };
  }, []);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && user) {
      websocketService.sendMessage(input, user.id);
      // Add message to local state
      setMessages((prev) => [
        ...prev,
        {
          id: user.id,
          content: input,
          render: "u",
        },
      ]);
      setInput("");
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
        <h3 className="font-medium">Chat</h3>
      </div>
      <div className="h-64 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${msg.render === "u" ? "text-right" : "text-left"}`}
          >
            <div
              className={`inline-block max-w-[80%] p-2 rounded-lg ${msg.render === "u" ? "bg-blue-100" : "bg-gray-100"}`}
            >
              <p>{msg.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};
