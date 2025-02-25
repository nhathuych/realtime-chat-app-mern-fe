import { useState } from "react"
import { useAuthStore } from "../store/useAuthStore"
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react"
import { Link } from "react-router-dom"
import AuthImagePattern from "../components/AuthImagePattern"
import toast from "react-hot-toast"

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '' })
  const { login, isLoggingIn } = useAuthStore()

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error('Email is required')
    if (!/\S+@\S+\.\S+/.test(formData.email.trim())) return toast.error('Invalid email format')
    if (!formData.password) return toast.error('Password is required')
    if (formData.password.length < 6) return toast.error('Password must be at least 6 characters')

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // toast.error() returns data that's neither false nor null
    if (validateForm() === true) login(formData)
  }

  return (
    <div className='grid lg:grid-cols-2 h-screen'>
      {/* left side */}
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='space-y-8 w-full max-w-md'>
          {/* logo */}
          <div className='mb-8 text-center'>
            <div className='group flex flex-col items-center gap-2'>
              <div className='group-hover:bg-primary flex justify-center items-center bg-primary/10 rounded-xl size-12 transition-colors'>
                <MessageSquare className='size-6 text-primary' />
              </div>
              <h1 className='mt-2 font-bold text-2xl'>Welcome Back</h1>
              <p className='text-base-content/60'>Sign in to your account</p>
            </div>
          </div>

          {/* form */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='form-control'>
              <label className='label'>
                <span className='font-medium label-text'>Email address</span>
              </label>
              <div className='relative'>
                <div className='left-0 absolute inset-y-0 flex items-center pl-3 pointer-events-none'>
                  <Mail className='size-5 text-base-content/40' />
                </div>
                <input
                  type='email'
                  className='pl-10 input-bordered w-full input'
                  placeholder='elon@tesla.com'
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className='form-control'>
              <label className='label'>
                <span className='font-medium label-text'>Password</span>
              </label>
              <div className='relative'>
                <div className='left-0 absolute inset-y-0 flex items-center pl-3 pointer-events-none'>
                  <Lock className='size-5 text-base-content/40' />
                </div>
                <input
                  type={showPassword? 'text' : 'password'}
                  className='pl-10 input-bordered w-full input'
                  placeholder='••••••'
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value})}
                />
                <button
                  type='button'
                  className='right-0 absolute inset-y-0 flex items-center pr-3'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className='size-5 text-base-content/40' /> : <Eye className="size-5 text-base-content/40" />}
                </button>
              </div>
            </div>

            <button type='submit' className='w-full btn btn-primary' disabled={isLoggingIn}>
              {isLoggingIn ? <><Loader2 className='size-5 animate-spin' />Loading...</> : 'Sign in'}
            </button>
          </form>

          <div className='text-center'>
            <p className='text-base-content/60'>Don't have an account?{" "}
              <Link to='/signup' className="link link-primary">Create an account</Link>
            </p>
          </div>
        </div>
      </div>

      {/* right side */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments and stay in touch with your loved ones."
      />
    </div>
  )
}

export default LoginPage
