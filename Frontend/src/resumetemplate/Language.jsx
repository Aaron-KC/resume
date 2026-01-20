import React from 'react'

const Language = ({info, select, unselect}) => {
  return (
    <div className='w-full flex gap-2 items-center justify-between'>
      <div>
        <span className='text-sm font-bold'>
          {info.language}
        </span>
      </div>
      {
        info.proficiency &&  <div className='flex gap-1'>{
          Array.from({length: 5}, (_, i) => i + 1).map(item => {
            return <div className='h-[15px] w-[15px] rounded-full' style={{backgroundColor: item <= info.proficiency ? select: unselect}}></div>
          })
        }</div>
      }
    </div>
  )
}

export default Language
