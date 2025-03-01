import { create } from "zustand"
import toast from "react-hot-toast"
import axiosInstance from "../lib/axiosInstance"
import { useAuthStore } from "./useAuthStore"

export const useChatStore = create((set, get) => ({
  users: [],
  messages: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    try {
      set({ isUsersLoading: true })
      const res = await axiosInstance.get('/users/sidebar-users')
      set({ users: res.data })
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      set({ isUsersLoading: false })
    }
  },

  setSelectedUser: async (userId) => set({ selectedUser: userId }),

  sendMessage: async (messageData) => {
    try {
      const { selectedUser, messages } = get()
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData)
      set({ messages: [...messages, res.data] })
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  },

  getMessages: async (userId) => {
    try {
      set({ isMessagesLoading: true })
      const res = await axiosInstance.get(`/messages/${userId}`)
      set({ messages: res.data })
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      set({ isMessagesLoading: false })
    }
  },

  listenForNewMessages: () => {
    const { selectedUser } = get()
    if (!selectedUser) return

    const socket = useAuthStore.getState().socket
    socket.on("newMessage", (newMessage) => {
      if (newMessage.senderId !== selectedUser._id) return

      set({ messages: [...get().messages, newMessage] })
    })
  },

  stopListeningForMessages: () => {
    const socket = useAuthStore.getState().socket
    socket.off("newMessage")
  },
}))
