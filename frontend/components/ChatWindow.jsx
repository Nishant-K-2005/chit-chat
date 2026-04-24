"use client";
import React, { useState } from "react";
import { MessageSquare, Send } from "lucide-react";
import useConvoStore from "@/store/useConvoStore";
import useUserStore from "@/store/useUserStore";
import useMessageStore from "@/store/useMessageStore";
function ChatWindow() {
  const [currMsg, setCurrMsg] = useState("");
  const { user } = useUserStore();
  const { currentConvo } = useConvoStore();
  const { messages, sendMessage } = useMessageStore();

  const chatPartner = currentConvo?.participants.find(
    (p) => p.user_name !== user.user_name,
  );

  const handleSendMessage = (e) => {
    sendMessage(currentConvo, currMsg);
    setCurrMsg("");
  };

  return (
    <>
      <main
        className={`flex-1 flex flex-col bg-slate-50/50 ${!currentConvo ? "hidden md:flex items-center justify-center" : "flex"}`}
      >
        {currentConvo ? (
          <>
            {/* Chat Header */}
            <header className="bg-white border-b w-full border-slate-100 p-4 flex flex-col ">
              <div className="text-xl font-semibold">
                {chatPartner.display_name}
              </div>
              <div className="text-sm font-light">{chatPartner.user_name}</div>
            </header>

            {/* Messages Area (Empty State) */}
            <div className="w-full flex-1 p-6 flex flex-col h-9/12 overflow-y-auto">
              {messages.map((msg) => {
                const isMe = msg.sender_id === user._id;
                const date = msg.createdAt.slice(11, 16);
                return (
                  <div
                    className={`flex ${isMe ? "justify-end" : "justify-start"} my-1`}
                    key={msg._id}
                  >
                    <div
                      className={`w-fit min-w-20 max-w-1/2 ${isMe ? "bg-blue-400" : "bg-gray-400"} rounded-lg`}
                    >
                      <div className="px-2 text-left">{msg.content}</div>
                      <div className="text-xs text-right px-1">{date}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input Area */}
            <footer className="w-full p-4 bg-white border-t border-slate-100">
              <div className="max-w-4xl mx-auto flex gap-3">
                <div className="flex-1 relative">
                  <input
                    id="inputMsg"
                    type="text"
                    placeholder="Type a message..."
                    value={currMsg}
                    onChange={(e) => setCurrMsg(e.target.value)}
                    className="w-full bg-slate-50 border-none rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  />
                </div>
                <button
                  className="bg-indigo-600 text-white p-3 rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                  onClick={handleSendMessage}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </footer>
          </>
        ) : (
          <div className="text-center">
            <div className="bg-indigo-50 w-20 h-20 rounded-4xl flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="w-10 h-10 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Select a conversation
            </h2>
            <p className="text-slate-500 max-w-xs mx-auto">
              Choose a chat from the sidebar to start messaging your friends or
              colleagues.
            </p>
          </div>
        )}
      </main>
    </>
  );
}

export default ChatWindow;
