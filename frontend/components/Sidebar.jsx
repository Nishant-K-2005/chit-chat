'use client'
import React, { useState } from 'react'
import Link from 'next/link';
import {
    MessageSquare,
    Settings,
    Plus,
    Users,
    Search,
} from 'lucide-react';
import useConvoStore from '@/store/useConvoStore';
import useUserStore from '@/store/useUserStore';
import useMessageStore from '@/store/useMessageStore';
import StartNewChat from './StartNewChat';


function Sidebar() {

    const [searchQuery, setSearchQuery] = useState('');
    const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);

    const { convoList, selectConvo, currentConvo } = useConvoStore()
    const { user } = useUserStore()
    const { loadMessages } = useMessageStore()

    console.log("Sidebar render: ",convoList.length);

    const handleSelectChat = (convoId) => {
        selectConvo(convoId);
        loadMessages(convoId);
    }

    return (
        <>
            <aside className={`w-full md:w-96 border-r border-slate-100 flex flex-col ${currentConvo ? 'hidden md:flex' : 'flex'}`}>

                {/* Sidebar Header */}
                <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-indigo-600 p-1.5 rounded-lg">
                            <MessageSquare className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-xl font-bold tracking-tight">Chit-Chat</h1>
                    </div>
                    <Link href="/home/profile" className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-500">
                        <Settings className="w-5 h-5" />
                    </Link>
                </div>

                {/* Action Buttons */}
                <div className="px-6 pb-4 flex gap-2">
                    <button
                        onClick={() => setIsNewChatModalOpen(true)}
                        className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                        <Plus className="w-4 h-4" /> New Chat
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 bg-slate-100 text-slate-700 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-200 transition-all">
                        <Users className="w-4 h-4" /> New Group
                    </button>
                </div>

                {/* Search */}
                <div className="px-6 mb-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search conversations..."
                            className="w-full bg-slate-50 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500/20 transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* List */}
                <div className="w-full flex flex-col items-baseline overflow-y-auto px-3 my-5">
                    {convoList.map(convo => {
                        const friend = convo.participants.find(p => p.user_name !== user.user_name)
                        return (
                            <button key={convo._id} className='border-b text-left w-full pb-2 pt-2' onClick={() => handleSelectChat(convo._id)}>
                                <div className='text-lg font-semibold'>{friend.display_name}</div>
                                <div className='text-sm font-light'>{friend.user_name}</div>
                            </button>
                        )
                    })}
                </div>
            </aside>

            <StartNewChat
                isOpen={isNewChatModalOpen}
                onClose={() => setIsNewChatModalOpen(false)}
            />
        </>
    )
}

export default Sidebar