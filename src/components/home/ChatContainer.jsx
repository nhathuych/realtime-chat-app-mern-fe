import { useEffect } from 'react'
import { useChatStore } from '../../store/useChatStore'
import ChatHeader from '../home/ChatHeader'
import MessageInput from '../home/MessageInput'
import MessageSkeleton from '../skeletons/MessageSkeleton'
import { useAuthStore } from '../../store/useAuthStore'
import { formatMessageTime } from '../../lib/utils'

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser } = useChatStore()
  const { authUser } = useAuthStore()

  useEffect(() =>{
    getMessages(selectedUser._id)
  }, [selectedUser._id, getMessages])

  if (isMessagesLoading) return (
    <div className='flex flex-col flex-1 overflow-auto'>
      <ChatHeader />
      <MessageSkeleton />
      <MessageInput />
    </div>
  )

  return (
    <div className='flex flex-col flex-1 overflow-auto'>
      <ChatHeader />

      {isMessagesLoading ? <MessageSkeleton /> : (
        <div className='flex flex-col flex-1 overflow-auto'>
          {messages.map((message) => (
            <div key={message._id} className={`chat ${message.senderId === authUser._id ? 'chat-end' : 'chat-start'}`}>
              <div className='chat-image avatar'>
                <div className='border rounded-full size-10'>
                  <img src={message.senderId === authUser._id ? (authUser.avatar || 'default-avatar.png') : (selectedUser.avatar || 'default-avatar.png')} alt='avatar' />
                </div>
              </div>

              <div className='mb-1 chat-header'>
                <time className='opacity-50 ml-1 text-xs'>{formatMessageTime(message.createdAt)}</time>
              </div>
              <div className='flex flex-col chat-bubble'>
                {message.imageUrl && <img src={message.imageUrl} className='mb-2 rounded-md sm:max-w-[200px]' alt='chat-image' />}
                {message.text && <p>{message.text}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      <MessageInput />
    </div>
  )
}

export default ChatContainer
