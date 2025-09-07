"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import { CircleUserRound } from 'lucide-react'
import Link from 'next/link'


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

    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState([]);
    const [selectedChatId, setSelectedChatId] = useState(1);
    const [newMessage, setNewMessage] = useState('');

    const selectedChat = chats.find(c => c.id === selectedChatId);
    const chatMessages = messages[selectedChatId] || [];
    const [isNewChatPopupOpen, setIsNewChatPopupOpen] = useState(false);
    const [newChatEmail, setNewChatEmail] = useState('');
    const [newChatMessage, setNewChatMessage] = useState('');

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

    const handleSendNewChat = (e) => {
        e.preventDefault();
        if (newChatEmail.trim() === '' || newChatMessage.trim() === '') return;

        // Simulate creating a new chat
        const newChatId = chats.length + 1;
        const recipientName = newChatEmail.split('@')[0];
        const newChat = {
            id: newChatId,
            name: recipientName.charAt(0).toUpperCase() + recipientName.slice(1),
            avatar: `https://placehold.co/100x100/E2E8F0/4A5568?text=${recipientName.substring(0,2).toUpperCase()}`,
            lastMessage: newChatMessage,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            unread: 0,
            online: true, // Assume user is online for this simulation
        };

        const newMessageObj = {
            id: 1,
            sender: 'me',
            text: newChatMessage,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        // Update states
        setChats([newChat, ...chats]); // Add to the top of the chat list
        setMessages({
            ...messages,
            [newChatId]: [newMessageObj]
        });

        // Close popup, clear fields, and select the new chat
        setIsNewChatPopupOpen(false);
        setNewChatEmail('');
        setNewChatMessage('');
        setSelectedChatId(newChatId);
    };

    const createNewChat = () => {
        
    }

    return (
        <div className="flex flex-col h-screen font-sans bg-sky-100 text-gray-800">
            {/* Global Header */}
            <header className="bg-white p-4 border-b border-gray-200 flex justify-between items-center flex-shrink-0 z-10">
                <h1 className="text-2xl font-bold text-indigo-600">Chats</h1>
                {/* Placeholder for user avatar/menu */}
                <button title="Your Profile">
                    <Link href='./profile'>
                        <CircleUserRound size={40}/>
                    </Link>
                </button>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar / Chat List */}
                <aside className={`relative bg-white border-r border-gray-200 flex flex-col w-full md:w-1/3 lg:w-1/4 ${selectedChatId !== null ? 'hidden' : 'flex'} md:flex`}>
                    <div className="p-4 border-b border-gray-200">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search or start new chat"
                                className="w-full px-4 py-2 pr-10 text-sm text-gray-700 bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <svg className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
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
                                <div className="flex-1 overflow-hidden">
                                    <div className="flex justify-between items-center">
                                        <h2 className="font-semibold">{chat.name}</h2>
                                        <p className={`text-xs flex-shrink-0 ${chat.unread > 0 ? 'text-indigo-600 font-bold' : 'text-gray-500'}`}>{chat.timestamp}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-gray-600 truncate text-sm">{chat.lastMessage}</p>
                                        {chat.unread > 0 && <span className="bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0">{chat.unread}</span>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Add New Chat Button */}
                    {isNewChatPopupOpen && (
                        <div className="absolute bottom-24 right-6 w-80 bg-white rounded-2xl shadow-2xl p-4 border border-gray-200 z-20">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-lg">New Message</h3>
                                <button onClick={() => setIsNewChatPopupOpen(false)} className="text-gray-400 hover:text-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                            <form onSubmit={handleSendNewChat}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">To (Email)</label>
                                    <input type="email" id="email" value={newChatEmail} onChange={(e) => setNewChatEmail(e.target.value)} required className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-600 mb-1">Message</label>
                                    <textarea id="message" rows="3" value={newChatMessage} onChange={(e) => setNewChatMessage(e.target.value)} required className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"></textarea>
                                </div>
                                <button type="submit" className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition">Send</button>
                            </form>
                        </div>
                    )}

                    {/* Add New Chat Button */}
                    <button 
                        onClick={() => setIsNewChatPopupOpen(!isNewChatPopupOpen)} 
                        title="New Chat"
                        className="absolute bottom-6 right-6 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 z-10">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12m6-6H6" />
                        </svg>
                    </button>
                </aside>

                {/* Main Chat Area */}
                <main className={`flex-1 flex-col ${selectedChatId !== null ? 'flex' : 'hidden'} md:flex`}>
                    {selectedChat ? (
                        <>
                            {/* Chat Header */}
                            <header className="bg-white p-4 border-b border-gray-200 flex items-center">
                                {/* Back Button - Mobile Only */}
                                <button onClick={() => setSelectedChatId(null)} className="mr-2 text-gray-600 hover:text-indigo-600 md:hidden">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                </button>
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
                                            <p className="break-words">{message.text}</p>
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
                        <div className="flex items-center justify-center h-full text-gray-500 p-4 text-center">
                            <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <h2 className="text-xl font-medium">Welcome to Chatterly</h2>
                            <p>Select a conversation from the sidebar to start chatting.</p>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default page
