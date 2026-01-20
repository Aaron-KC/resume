import React from 'react'

const Contact = ({ icon, description, bgColor }) => {
  return (
    <div className='w-full flex gap-2 items-center'>
      <div
        className='h-[30px] w-[30px] rounded-full flex justify-center items-center text-[15px]' 
        style={{ backgroundColor: `${bgColor}` }}
      >
        {icon}
      </div>
      <div className=''>
        <span className='text-xs font-medium break-all whitespace-normal w-full block'>
          {description}
        </span>
      </div>
    </div>
  )
}

export default Contact
