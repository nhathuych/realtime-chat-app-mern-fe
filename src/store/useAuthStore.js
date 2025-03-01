import { create } from "zustand" // Read more: https://www.npmjs.com/package/zustand
import axiosInstance from "../lib/axiosInstance"
import toast from "react-hot-toast"
import { io } from "socket.io-client"

// Because an arrow function () => ({ ... }) is used, the object must be wrapped in () to avoid confusion with a block statement {}
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLogginIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/users/current")
      set({ authUser: res.data.user })

      get().connectSocket()
    } catch (error) {
      set({ authUser: null })
      console.log("Error in checkAuth:", error)
    } finally {
      set({ isCheckingAuth: false })
    }
  },

  signup: async (data) => {
    try {
      set({ isSigningUp: true })
      const res = await axiosInstance.post('/auth/signup', data)
      set({ authUser: res.data })
      toast.success('Your account has been created successfully')
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      set({ isSigningUp: false })
    }
  },

  login: async (data) => {
    try {
      set({ isLogginIn: true })
      const res = await axiosInstance.post('/auth/login', data)
      set({ authUser: res.data })
      toast.success('You have been logged in successfully')

      get().connectSocket()
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      set({ isLogginIn: false })
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post('auth/logout')
      set({ authUser: null })
      toast.success('You have been logged out successfully')
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      get().disconnectSocket()
    }
  },

  updateProfile: async (data) => {
    try {
      set({ isUpdatingProfile: true })
      const res = await axiosInstance.put('users/upload-picture', data)
      set({ authUser: res.data })
      toast.success('Your profile has been updated successfully')
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      set({ isUpdatingProfile: false })
    }
  },

  connectSocket: async () => {
    const { authUser } = get()
    if (!authUser || get().socket?.connected) return

    const socket = io(import.meta.env.VITE_SOCKET_HTTP_BASE_URL)

    socket.connect()
    set({ socket })
  },

  disconnectSocket: async () => {
    if (get().socket?.connected) get().socket.disconnect()
  },
}))
