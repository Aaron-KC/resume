import React, { useState } from 'react'
import { LuTrash } from 'react-icons/lu'
import ProfileImage from './ProfileImage'
import Input from './Input'

const PersonalInformation = ({handleInfoChange, personalInformation, handleImage, image, deleteImage}) => {
  return (
    <>
      <p className='text-md font-semibold'>Personal Information</p>
      <div className='flex justify-center py-5'>
        <ProfileImage preview={personalInformation.profileUrl} handleImage={handleImage} image={image} deleteImage={deleteImage}/>
      </div>
      <div className='flex gap-2 flex-col md:flex-row w-full'>
        <div className='flex flex-col w-full md:w-1/2'>
          <Input label={'Full Name'} name={personalInformation?.fullName} handleChange={e => handleInfoChange('fullName', e.target.value)} value={personalInformation.fullName}/>
        </div>
        <div className='flex flex-col w-full md:w-1/2'>
          <Input label={'Designation'} name={personalInformation?.description} handleChange={e => handleInfoChange('description', e.target.value)} value={personalInformation.description}/>
        </div>
      </div>
      <div className='py-3 flex flex-col gap-3 w-full'>
        <label htmlFor={"summary"} className='text-sm font-semibold'>Summary</label>
        <textarea name="" id="summary" className='inputs resize-none' rows={4} onChange={e => handleInfoChange('summary', e.target.value)} value={personalInformation.summary}></textarea>
      </div>
    </>
  )
}

export default PersonalInformation
