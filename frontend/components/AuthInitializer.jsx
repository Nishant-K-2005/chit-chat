'use client'
import React, { useEffect } from 'react'
import { useRouter,usePathname } from 'next/navigation';
import useUserStore from "@/store/useUserStore"
import Loading from "./Loading";

function AuthInitializer({children}) {
    const {checkSession, isAuthenticated, isLoading} = useUserStore();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(()=>{
        checkSession();
    },[checkSession])

    useEffect(()=>{
        if(isLoading) return;
        const publicPaths = ['/auth/login','/auth/signup','/'];
        const isPublicPath = publicPaths.includes(pathname);

        if(isAuthenticated && isPublicPath){
            router.push('/home');
        }

        if(!isAuthenticated && !isPublicPath){
            router.push('/');
        }
    },[isLoading, isAuthenticated, pathname, router])
    
    if(isLoading){ 
        return <Loading/>
    }

    return <>{children}</>
}

export default AuthInitializer