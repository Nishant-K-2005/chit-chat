import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
    io = new Server(server, {
        cors: {origin:"http://localhost:3000"}
    })
    io.on("connection",(socket)=>{
        const userId = socket.handshake.query.userId;
        if(userId){
            socket.join(userId)
            console.log(`${userId} came online`) 
        }

        // Joining a conversation
        socket.on("joinChat",(convoId)=>{
            socket.join(convoId);
            console.log(`${userId} joind ${convoId}`)
        })

        // Leaving a conversation
        socket.on("leaveChat",(convoId)=>{
            socket.leave(convoId);
            console.log(`${userId} left ${convoId}`)
        })

        
        
        socket.on("disconnect",()=>{
            console.log(`user with user id:${userId} and socket id:${socket.id} disconnected`)
        })
    })
    return io;
}

export const getIo = () => {
    if(!io) throw new Error("Socket.io not initalized")
    return io
}

export const getReceiverSocketId = (receiverUserId) => userSocketMap[receiverUserId]