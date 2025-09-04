"use client"
import React from 'react'
import { auth } from '@/lib/firebase/config'
import { signOut,onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useEffect, useState,useRef } from 'react'


// --- Mock Data ---
const initialChats = [
    { id: 1, name: 'Sarah Miller', avatar: 'https://placehold.co/100x100/E2E8F0/4A5568?text=SM', lastMessage: 'Awesome, thanks! I\'ll check it out.', timestamp: '10:42 AM', unread: 2, online: true },
    { id: 2, name: 'Michael Chen', avatar: 'https://placehold.co/100x100/E2E8F0/4A5568?text=MC', lastMessage: 'Sounds good. Let\'s sync up tomorrow.', timestamp: '9:15 AM', unread: 0, online: false },
    { id: 3, name: 'Emily Rodriguez', avatar: 'https://placehold.co/100x100/E2E8F0/4A5568?text=ER', lastMessage: 'Can you send me the report?', timestamp: 'Yesterday', unread: 0, online: true },
    { id: 4, name: 'David Lee', avatar: 'https://placehold.co/100x100/E2E8F0/4A5568?text=DL', lastMessage: 'You: Perfect, I\'m on it.', timestamp: 'Yesterday', unread: 0, online: false },
    { id: 5, name: 'Project Team', avatar: 'https://placehold.co/100x100/E2E8F0/4A5568?text=PT', lastMessage: 'Michael: The new designs are ready for review.', timestamp: 'Yesterday', unread: 5, online: true },
];

const initialMessages = {
    1: [
        { id: 1, sender: 'Sarah Miller', text: 'Hey! Did you get a chance to look at the new mockups?', timestamp: '10:30 AM' },
        { id: 2, sender: 'me', text: 'Hey Sarah! Not yet, I was just about to. I\'ll take a look now.', timestamp: '10:31 AM' },
        { id: 3, sender: 'Sarah Miller', text: 'Great, let me know what you think. I\'m particularly interested in your feedback on the new dashboard layout.', timestamp: '10:32 AM' },
        { id: 4, sender: 'me', text: 'Will do. Give me a few minutes.', timestamp: '10:32 AM' },
        { id: 5, sender: 'me', text: 'Wow, this looks amazing! The new layout is so much cleaner and more intuitive.', timestamp: '10:40 AM' },
        { id: 6, sender: 'Sarah Miller', text: 'Awesome, thanks! I\'ll check it out.', timestamp: '10:42 AM' },
    ],
    2: [
        { id: 1, sender: 'Michael Chen', text: 'Morning! Quick question about the API integration.', timestamp: '9:14 AM' },
        { id: 2, sender: 'me', text: 'Morning Michael, shoot.', timestamp: '9:14 AM' },
        { id: 3, sender: 'Michael Chen', text: 'Sounds good. Let\'s sync up tomorrow.', timestamp: '9:15 AM' },
    ],
    3: [
        { id: 1, sender: 'Emily Rodriguez', text: 'Can you send me the report?', timestamp: 'Yesterday' },
    ],
    4: [
        { id: 1, sender: 'me', text: 'Perfect, I\'m on it.', timestamp: 'Yesterday' },
    ],
    5: [
        { id: 1, sender: 'Michael Chen', text: 'The new designs are ready for review.', timestamp: 'Yesterday' },
    ]
};
// --- End Mock Data ---

function page() {

    const router = useRouter()

    const [chats, setChats] = useState(initialChats);
    const [messages, setMessages] = useState(initialMessages);
    const [selectedChatId, setSelectedChatId] = useState(1);
    const [newMessage, setNewMessage] = useState('');

    const selectedChat = chats.find(c => c.id === selectedChatId);
    const chatMessages = messages[selectedChatId] || [];

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom()
    }, [chatMessages]);


    const handleSelectChat = (id) => {
        setSelectedChatId(id);
        // Mark messages as read
        const updatedChats = chats.map(chat => chat.id === id ? { ...chat, unread: 0 } : chat);
        setChats(updatedChats);
    };
    
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;

        const newMessageObj = {
            id: chatMessages.length + 1,
            sender: 'me',
            text: newMessage,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        const updatedMessages = {
            ...messages,
            [selectedChatId]: [...chatMessages, newMessageObj]
        };
        setMessages(updatedMessages);
        setNewMessage('');
    };

    const handleLogout = async (e)=>{
        e.preventDefault();
        try{
            await signOut(auth);
            router.push('/auth/login');
        }catch(err){
            console.log("Error logging out",err.message);
        }
    }

    return (
        <div className="flex h-screen font-sans bg-sky-100 text-gray-800">
            {/* Sidebar / Chat List */}
            <aside className="w-full md:w-1/3 lg:w-1/4 bg-white border-r border-gray-200 flex flex-col">
                <header className="p-4 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-indigo-600">Chats</h1>
                </header>
                <div className="flex-1 overflow-y-auto">
                    {chats.map(chat => (
                        <div
                            key={chat.id}
                            onClick={() => handleSelectChat(chat.id)}
                            className={`p-4 flex items-center cursor-pointer transition-colors ${selectedChatId === chat.id ? 'bg-indigo-50' : 'hover:bg-gray-100'}`}
                        >
                            <div className="relative">
                                <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full mr-4" />
                                {chat.online && <span className="absolute bottom-0 right-4 block h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-center">
                                    <h2 className="font-semibold">{chat.name}</h2>
                                    <p className={`text-xs ${chat.unread > 0 ? 'text-indigo-600 font-bold' : 'text-gray-500'}`}>{chat.timestamp}</p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-gray-600 truncate text-sm">{chat.lastMessage}</p>
                                    {chat.unread > 0 && <span className="bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{chat.unread}</span>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </aside>

            {/* Main Chat Area */}
            <main className="flex-1 flex flex-col">
                {selectedChat ? (
                    <>
                        {/* Chat Header */}
                        <header className="bg-white p-4 border-b border-gray-200 flex items-center">
                            <img src={selectedChat.avatar} alt={selectedChat.name} className="w-10 h-10 rounded-full mr-4" />
                            <div>
                                <h2 className="font-semibold text-lg">{selectedChat.name}</h2>
                                <p className="text-sm text-gray-500">{selectedChat.online ? 'Online' : 'Offline'}</p>
                            </div>
                        </header>

                        {/* Messages */}
                        <div className="flex-1 p-6 overflow-y-auto bg-sky-50">
                            {chatMessages.map(message => (
                                <div key={message.id} className={`flex mb-4 ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-md p-3 rounded-2xl ${message.sender === 'me' ? 'bg-indigo-500 text-white rounded-br-none' : 'bg-white rounded-bl-none shadow-sm'}`}>
                                        <p>{message.text}</p>
                                        <p className={`text-xs mt-1 ${message.sender === 'me' ? 'text-indigo-100' : 'text-gray-400'} text-right`}>{message.timestamp}</p>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Message Input */}
                        <footer className="bg-white p-4 border-t border-gray-200">
                            <form onSubmit={handleSendMessage} className="flex items-center">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type a message..."
                                    className="w-full px-4 py-3 text-gray-700 bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                                />
                                <button type="submit" className="ml-4 px-6 py-3 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition">
                                    Send
                                </button>
                            </form>
                        </footer>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        Select a chat to start messaging
                    </div>
                )}
            </main>
        </div>
    );
}

export default page
