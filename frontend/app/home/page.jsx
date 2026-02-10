'use client'
import React from 'react'
import useUserStore from '@/store/useUserStore.js'

function page() {
  const {logout} = useUserStore();
  const handleLogout = () => {
    logout();
  }
  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default page