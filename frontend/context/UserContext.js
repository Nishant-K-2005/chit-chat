"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true); // Start as true
    const { user, idToken, loading: authLoading } = useAuth();


    useEffect(() => {
        const fetchUserProfile = async () => {
            if (!user) {
                setProfile(null);
                setLoading(false);
                return;
            }

            try {
                // console.log("Frontend-UserContext: ",idToken);
                const response = await fetch('http://localhost:4000/api/users/profile', {
                    headers: {
                        'Authorization': `Bearer ${idToken}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user profile from backend');
                }

                const data = await response.json();
                setProfile(data);
            } catch (error) {
                console.error("UserContext Error:", error);
                setProfile(null);
            } finally {
                setLoading(false);
            }
        };

        if (!authLoading && user) {
            fetchUserProfile();
        } else {
            // If there's no user or auth is still loading, clear the profile and stop loading.
            setProfile(null);
            setLoading(false);
        }
    }, [user, idToken, authLoading]);
    if (loading) {
        return <div>Loading Application...</div>;
    }

    return (
        <UserContext.Provider value={{ profile }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};