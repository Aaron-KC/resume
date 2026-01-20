import React from 'react'
import { LuTrash, LuUpload, LuUser } from 'react-icons/lu'

const ProfileImage = ({preview, handleImage, deleteImage, image}) => {
  return (
    <div className='bg-purple-100 h-20 w-20 rounded-full text-3xl mx-auto relative flex items-center justify-center'>
      <input type="file" id='upload' className='hidden' onChange={handleImage} />
      {
        preview || image ? <>
          <img src={preview || image} className='w-full h-full rounded-full object-cover' />
          <div className='absolute -bottom-2 -right-2 cursor-pointer bg-gradient-to-tr from-red-500 to-red-700 text-white p-3 rounded-full'>
            <LuTrash className='font-bold text-sm' onClick={deleteImage} />
          </div>
        </> : <>
          <LuUser className='text-purple-500 font-bold' />
          <label htmlFor="upload" className='absolute bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white p-3 text-sm rounded-full -bottom-2 -right-2 cursor-pointer'><LuUpload className='font-bold' /></label>
        </>
      }
    </div>
  )
}

export default ProfileImage
