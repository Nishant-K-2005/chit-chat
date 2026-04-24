import { create } from "zustand";
import useSocketStore from "./useSocketStore";

const useConvoStore = create((set, get) => ({
  convoList: [],
  currentConvo: null,
  isLoading: true,
  error: null,

  getConvo: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch(
        "http://localhost:5000/api/conversation/getConversations",
        {
          method: "GET",
          credentials: "include",
        },
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.error);
        set({ error: data.error, convoList: [], isLoading: false });
        return data.error;
      }
      set({ convoList: data.convos, isLoading: false, error: null });
    } catch (err) {
      console.log("Convo Store error: ", err);
      set({ error: err, convoList: [], isLoading: false });
    }
  },

  startConvo: async (receiverUserName, content) => {
    set({ isLoading: true });
    try {
      const res = await fetch(
        "http://localhost:5000/api/conversation/startNewConvo",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            receiver_username: receiverUserName,
            content: content,
          }),
        },
      );
      const data = await res.json();
      if (!res.ok) {
        set({ error: data.error, isLoading: false });
        console.log(data.error);
        return data.error;
      }
      get().updateConvo(data);
      set({ currentConvo: data, error: null, isLoading: false });
    } catch (err) {
      console.log(err);
      set({ error: err, isLoading: false });
    }
  },

  updateConvo: (updatedConvo) => {
    set((state) => {
      const remaining = state.convoList.filter(
        (c) => c._id.toString() !== updatedConvo._id.toString(),
      );
      return {
        convoList: [updatedConvo, ...remaining],
      };
    });
    console.log(get().convoList);
  },

  selectConvo: (convoId) => {
    const list = get().convoList;
    const selected = list.find((convo) => convo._id === convoId);
    const prevConvo = get().currentConvo;
    if (selected) {
      const socket = useSocketStore.getState().socket;
      if (!socket) return;
      if (prevConvo?._id) {
        socket.emit("leaveChat", prevConvo._id);
      }
      socket.emit("joinChat", convoId);
      set({ currentConvo: selected });
    }
  },
}));

export default useConvoStore;
