import { create } from "zustand";
import useConvoStore from "./useConvoStore";

const useMessageStore = create((set, get) => ({
  messages: [],
  error: null,

  setMessages: (msgs) => set({ messages: msgs }),

  loadMessages: async (convoId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/message/getMessages/${convoId}`,
        {
          credentials: "include",
        },
      );
      const data = await res.json();
      if (!res.ok) {
        set({ error: data.error });
        console.log("load messages error: ", data.error);
        return;
      }
      set({ messages: data, error: null });
    } catch (err) {
      set({ error: err });
      console.log("load messages error: ", err);
    }
  },
  sendMessage: async (convo, content) => {
    try {
      const res = await fetch(`http://localhost:5000/api/message/sendMessage`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          convo_id: convo._id,
          content: content,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        set({ error: data.err });
        console.log("Send Message error: ", data.err);
        return;
      }

      const updateConvo = useConvoStore.getState().updateConvo;
      updateConvo(convo);
    } catch (err) {
      set({ error: err });
      console.log("Send Message Error: ", err);
      return;
    }
  },
}));

export default useMessageStore;
