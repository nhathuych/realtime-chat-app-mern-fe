import { useChatStore } from '../store/useChatStore'
import Sidebar from '../components/home/Sidebar'
import NoChatSelected from '../components/home/NoChatSelected'
import ChatContainer from '../components/home/ChatContainer'

const HomePage = () => {
  const { selectedUser } = useChatStore()

  return (
    <div className='bg-base-200 h-screen'>
      <div className='flex justify-center items-center px-4 pt-20'>
        <div className='bg-base-100 shadow-cl rounded-lg w-full max-w-6xl h-[calc(100vh-8rem)]'>
          <div className='flex rounded-lg h-full overflow-hidden'>
            <Sidebar />

            {selectedUser ? <ChatContainer /> : <NoChatSelected />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
