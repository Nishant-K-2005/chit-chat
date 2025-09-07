"use client"
import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/config";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [idToken, setIdToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, async(currUser)=>{
            if(currUser){
                setUser(currUser);
                const token = await currUser.getIdToken();
                setIdToken(token);
            }else{
                setUser(null);
                setIdToken(null);
            }
            setLoading(false);
        })
        return () => unsubscribe();
    },[]);

    const value = {user, idToken, loading};

    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}