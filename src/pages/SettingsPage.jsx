import { useThemeStore } from "../store/useThemeStore"
import { THEMES } from '../constants/index'
import { Send } from "lucide-react"

const PREVIEW_MESSAGES = [
  { id: 0, content: "Hey, How's it going?", isSent: false },
  { id: 1, content: "I'm doing great! Just working on some new features", isSent: true },
]

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore()

  return (
    <div className='mx-auto px-4 pt-20 max-w-5xl h-screen container'>
      <div className='space-y-6'>
        <div className='flex flex-col gap-1'>
          <div className='font-semibold text-lg'>Theme</div>
          <p className='text-sm text-base-content/70'>Choose a theme for your chat interface</p>
        </div>

        <div className='gap-2 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8'>
          {THEMES.map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`${t === theme ? 'bg-base-200' : 'hover:bg-base-200/50'} group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors`}
            >
              <div data-theme={t} className='relative rounded-md w-full h-8 overflow-hidden'>
                <div className='absolute inset-0 gap-px grid grid-cols-4 p-1'>
                  <div className='bg-primary rounded'></div>
                  <div className='bg-secondary rounded'></div>
                  <div className='bg-accent rounded'></div>
                  <div className='bg-neutral rounded'></div>
                </div>
              </div>
              <span className='w-full font-medium text-[11px] text-center truncate'>
                {t.replace(/^\w/, (firstChar) => firstChar.toUpperCase())}
              </span>
            </button>
          ))}
        </div>

        {/* preview section */}
        <h3 className='mb-3 font-semibold text-lg'>Preview</h3>
        <div className='bg-base-100 shadow-lg border border-base-300 rounded-xl overflow-hidden'>
          <div className='bg-base-200 p-4'>
            <div className='mx-auto max-w-lg'>

              {/* mock chat ui */}
              <div className='bg-base-100 shadow-sm rounded-xl overflow-hidden'>
                {/* chat header */}
                <div className='bg-base-100 px-4 py-3 border-b border-base-300'>
                  <div className='flex items-center gap-3'>
                    <div className='flex justify-center items-center bg-primary rounded-full size-8 font-medium text-primary-content'>
                      J
                    </div>
                    <div>
                      <h3 className='font-medium text-sm'>Donald Trump</h3>
                      <p className='text-xs text-base-content/70'>Online</p>
                    </div>
                  </div>
                </div>

                {/* chat messages */}
                <div className='space-y-4 bg-base-100 p-4 min-h-[200px] max-h-[200px] overflow-y-auto'>
                  {PREVIEW_MESSAGES.map((message) => (
                    <div key={message.id} className={`flex ${message.isSent ? 'justify-end' : 'justify-start'}`}>
                      <div className={`${message.isSent ? 'bg-primary text-primary-content' : 'bg-base-200'} shadow-sm p-3 rounded-xl max-w-[80%]`}>
                        <p className='text-sm'>{message.content}</p>
                        <p className={`${message.isSent ? 'text-primary-content/70' : 'text-base-content/70'} mt-1.5 text-[10px]`}>10:11 AM</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* chat input */}
                <div className='bg-base-100 p-4 border-t border-base-300'>
                  <div className='flex gap-2'>
                    <input
                      type='text'
                      className='flex-1 input-bordered h-10 text-sm input'
                      placeholder='Type a message...'
                      readOnly
                    />
                    <button className='h-10 min-h-0 btn btn-primary'>
                      <Send size={18} />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
