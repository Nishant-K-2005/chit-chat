'use client'
import { useEffect } from "react"
import useUserStore from "@/store/useUserStore"
import useSocketStore from "@/store/useSocketStore"

const SocketInitializer = ({children}) => {
    const {user} = useUserStore()
    const {connectSocket, disconnectSocket} = useSocketStore()

    useEffect(()=>{
        if(user?._id){
            connectSocket(user._id)
        }
        return () => {
            disconnectSocket()
        }
    },[user?._id, connectSocket,disconnectSocket]);
    return <>{children}</>
}

export default SocketInitializer