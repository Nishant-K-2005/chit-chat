'use client'
import React, { useEffect } from 'react';
import useConvoStore from '@/store/useConvoStore';
import useUserStore from '@/store/useUserStore';
import Loading from '@/components/Loading';
import Sidebar from '@/components/Sidebar';
import ChatWindow from '@/components/ChatWindow';

const page = () => {
    const { getConvo, isLoading: chatLoading } = useConvoStore();
    const { isLoading: userLoading } = useUserStore();


    useEffect(() => {
        getConvo();
    }, [])

    if (userLoading || chatLoading) return <Loading />

    return (
        <div className="flex h-screen bg-white text-slate-900 font-sans overflow-hidden">
            <Sidebar />
            <ChatWindow />
        </div>
    );
};

export default page;