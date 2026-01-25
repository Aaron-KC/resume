import React from 'react'

const Modal = ({children}) => {
  return (
    <div className='fixed inset-0 bg-[rgba(0,0,0,0.5)] z-50 flex justify-center items-center'>
      {children}
    </div>
  )
}

export default Modal
