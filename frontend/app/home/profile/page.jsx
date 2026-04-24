'use client'
import React from 'react'
import useUserStore from '@/store/useUserStore.js'

function page() {
    const {logout} = useUserStore()
    const handleLogout = () => {
        logout()
    }
    return (
        <>
            <h1>Profile Page</h1>
            <button onClick={handleLogout}>Logout</button>
        </>
    )
}

export default page