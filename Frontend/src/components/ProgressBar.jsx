import React from 'react'

const ProgressBar = ({width}) => {
  console.log(width)
  return (
    <>
      <div className='bg-gray-100 absolute left-0 right-0 top-0 h-1'></div>
      <div className='absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 transition-all duration-150' style={{width: `${width}%`}}>
      </div>
    </>
  )
}

export default ProgressBar
