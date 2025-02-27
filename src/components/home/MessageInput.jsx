import { useRef, useState } from 'react'
import { useChatStore } from '../../store/useChatStore'
import { Image, Send, X } from 'lucide-react'
import toast from 'react-hot-toast'

const MessageInput = () => {
  const [text, setText] = useState('')
  const [imagePreview, setImagePreview] = useState(null)
  const fileInputRef = useRef(null)
  const { sendMessage } = useChatStore()

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file.type.startsWith('image/')) return toast.error('Only images are allowed')

    const reader = new FileReader()
    reader.onloadend = () => { setImagePreview(reader.result) }
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setImagePreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!text.trim() && !imagePreview) return

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview
      })

      setText('')
      removeImage()
    } catch (error) {
      toast.error('Error while sending message. Try again!')
      console.error(error)
    }
  }

  return (
    <div className='p-4 w-full'>
      {imagePreview && (
        <div className='flex items-center gap-2 mb-3'>
          <div className='relative'>
            <img
              src={imagePreview}
              alt='Image Preview'
              className='border border-zinc-700 rounded-lg size-20 object-cover'
            />

            <button
              type='button'
              onClick={removeImage}
              className='-top-1.5 -right-1.5 absolute flex justify-center items-center bg-base-300 rounded-full size-5'
            >
              <X className='size-3' />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className='flex items-center gap-2'>
        <div className='flex flex-1 gap-2'>
          <input
            type='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Type a message...'
            className='input-bordered rounded-lg w-full input input-sm sm:input-md'
          />

          <input
            type='file'
            accept='image/*'
            ref={fileInputRef}
            onChange={handleImageUpload}
            className='hidden'
          />
          <button
            type='button'
            onClick={() => fileInputRef.current?.click()}
            className={`hidden sm:flex btn btn-circle ${imagePreview ? 'text-emerald-500' : 'text-zinc-400'}`}
          >
            <Image size={20} />
          </button>

          <button type='submit' className='btn btn-circle' disabled={!text.trim() && !imagePreview}>
            <Send size={22} />
          </button>
        </div>
      </form>
    </div>
  )
}

export default MessageInput
