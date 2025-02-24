import { create } from "zustand" // Read more: https://www.npmjs.com/package/zustand
import axiosInstance from "../lib/axiosInstance"

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
  }
}))
