import { create } from "zustand";
import { io } from "socket.io-client";
import useConvoStore from "./useConvoStore";
import useMessageStore from "./useMessageStore";

const useSocketStore = create((set, get) => ({
  socket: null,
  onlineUsers: [],

  connectSocket: (userId) => {
    if (get().socket?.connected) {
      return;
    }

    const socket = io("http://localhost:5000", {
      query: { userId },
    });

    socket.on("getOnlineUsers", (users) => {
      set({ onlineUsers: users });
    });

    set({ socket });

    get().initializeListeners();
  },

  initializeListeners: () => {
    const socket = get().socket;
    if (!socket) return;

    socket.off("newMessage");

    socket.on("newMessage", (newMessage) => {
      const { currentConvo, updateConvo } = useConvoStore.getState();
      const { messages, setMessages } = useMessageStore.getState();

      if (currentConvo?._id === newMessage.conversation_id) {
        setMessages([...messages, newMessage]);
      }
    });
  },

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket) {
      socket.disconnect();
      set({ socket: null, onlineUsers: [] });
    }
  },
}));

export default useSocketStore;
