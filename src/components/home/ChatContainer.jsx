import { useEffect, useRef } from 'react'
import { useChatStore } from '../../store/useChatStore'
import ChatHeader from '../home/ChatHeader'
import MessageInput from '../home/MessageInput'
import MessageSkeleton from '../skeletons/MessageSkeleton'
import { useAuthStore } from '../../store/useAuthStore'
import { formatMessageTime } from '../../lib/utils'

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser, listenForNewMessages, stopListeningForMessages } = useChatStore()
  const { authUser } = useAuthStore()
  const latestMessageRef = useRef()

  useEffect(() =>{
    getMessages(selectedUser._id)

    listenForNewMessages()

    // stopListeningForMessages() is not called immediately
    // React runs this cleanup function when the component unmounts 
    //   or when selectedUser._id changes to prevent memory leaks 
    //   and avoid multiple event listeners
    return () => stopListeningForMessages() // cleanup function
  }, [selectedUser._id, getMessages, listenForNewMessages, stopListeningForMessages])

  useEffect(() => {
    latestMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className='flex flex-col flex-1 overflow-auto'>
      <ChatHeader />

      {isMessagesLoading ? <MessageSkeleton /> : (
        <div className='flex flex-col flex-1 overflow-auto'>
          {messages.map((message) => (
            <div
              key={message._id}
              ref={latestMessageRef}
              className={`chat ${message.senderId === authUser._id ? 'chat-end' : 'chat-start'}`}
            >
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
