import { Users } from 'lucide-react'

const SidebarSkeleton = () => {
  const skeletonContacts = Array(8).fill(null) // create 8 skeleton items

  return (
    <aside className='flex flex-col border-r border-base-300 w-20 lg:w-72 h-full transition-all duration-200'>
      {/* header */}
      <div className='p-5 border-b border-base-300 w-full'>
        <div className='flex items-center gap-2'>
          <Users className='size-6' />
          <span className='hidden lg:block font-medium'>Contacts</span>
        </div>
      </div>

      {/* skeleton contacts */}
      <div className='py-3 w-full overflow-y-auto'>
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className='flex items-center gap-3 p-3 w-full'>
            {/* avatar skeleton */}
            <div className='relative mx-auto lg:mx-0'>
              <div className='rounded-full size-12 skeleton' />
            </div>

            {/* user info skeleton - only visible on larger screens */}
            <div className='hidden lg:block flex-1 min-w-0 text-left'>
              <div className='mb-2 w-32 h-4 skeleton' />
              <div className='w-16 h-3 skeleton' />
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}

export default SidebarSkeleton
