import { create } from "zustand" // Read more: https://www.npmjs.com/package/zustand
import axiosInstance from "../lib/axiosInstance"
import toast from "react-hot-toast"

// Because an arrow function () => ({ ... }) is used, the object must be wrapped in () to avoid confusion with a block statement {}
export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLogginIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/users/current")
      set({ authUser: res.data })
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
  }
}))
