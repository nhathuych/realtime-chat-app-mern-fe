import axios from "axios"

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // In Vite, use import.meta.env.VITE_* instead of process.env.VITE_* 
  withCredentials: true, // Enable sending cookies with each request
})

export default axiosInstance
