'use client'

import { useState } from "react";
import {
    X,
    UserPlus,
    AtSign,
    MessageSquare
} from "lucide-react";
import useConvoStore from "@/store/useConvoStore";


const StartNewChat = ({ isOpen, onClose }) => {
    const [username, setUsername] = useState('');
    const [firstMessage, setFirstMessage] = useState('');

    const {startConvo} = useConvoStore()

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Starting chat with:', username, 'Message:', firstMessage);
        startConvo(username, firstMessage);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            ></div>

            {/* Dialogue Box */}
            <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl border border-slate-100 p-8 animate-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 hover:bg-slate-50 rounded-full text-slate-400 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="text-center mb-8">
                    <div className="bg-indigo-50 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <UserPlus className="w-7 h-7 text-indigo-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">New Chat</h2>
                    <p className="text-slate-500 text-sm mt-1">Start a private conversation instantly</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Username Field */}
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                            Recipient Username
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <AtSign className="h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                            </div>
                            <input
                                type="text"
                                autoFocus
                                className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                                placeholder="e.g. johndoe_99"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* First Message Field */}
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                            First Message
                        </label>
                        <div className="relative group">
                            <div className="absolute top-4 left-4 pointer-events-none">
                                <MessageSquare className="h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                            </div>
                            <textarea
                                className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm resize-none h-24"
                                placeholder="Say hello..."
                                value={firstMessage}
                                onChange={(e) => setFirstMessage(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 pt-2">
                        <button
                            type="submit"
                            disabled={!username.trim() || !firstMessage.trim()}
                            className="w-full flex justify-center items-center gap-2 py-4 px-4 rounded-2xl shadow-lg shadow-indigo-100 text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:opacity-50 disabled:shadow-none transition-all active:scale-[0.98]"
                        >
                            Send & Start Chat
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full py-2 text-slate-500 font-semibold text-sm hover:text-slate-800 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StartNewChat;