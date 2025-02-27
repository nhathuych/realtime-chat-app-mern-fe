import { useChatStore } from '../../store/useChatStore'
import { useAuthStore } from '../../store/useAuthStore'
import { X } from 'lucide-react'

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore()
  const { onlineUsers } = useAuthStore()

  return (
    <div className='p-2.5 border-b border-base-300'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-3'>
          {/* avatar */}
          <div className='avatar'>
            <div className='relative rounded-full size-10'>
              <img src={selectedUser.avatar || '/default-avatar.png'} />
            </div>
          </div>

          {/* user info */}
          <div>
            <h3 className='font-medium'>{selectedUser.fullName}</h3>
            <p className='text-sm text-base-content/70'>
              {onlineUsers.includes(selectedUser._id) ? 'Online' : 'Offline'}
            </p>
          </div>

          {/* close button */}
          <button onClick={() => setSelectedUser(null)}>
            <X />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatHeader
