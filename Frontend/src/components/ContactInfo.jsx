import React from 'react'
import Input from './Input'

const ContactInfo = ({contactInfo, handleInfoChange}) => {
  return (
    <>
      <p className='text-md font-semibold'>Contact Information</p>
      <Input label={'Address'} name={contactInfo.address} handleChange={e => handleInfoChange('address', e.target.value) } value={contactInfo.address}/>
      <div className='flex gap-2 flex-col md:flex-row w-full'>
        <div className='flex flex-col w-full md:w-1/2'>
          <Input label={'Email'} name={contactInfo?.email} handleChange={e => handleInfoChange('email', e.target.value)} value={contactInfo.email} />
        </div>
        <div className='flex flex-col w-full md:w-1/2'>
          <Input label={'Phone Number'} name={contactInfo?.phoneNumber} handleChange={e => handleInfoChange('phoneNumber', e.target.value)} value={contactInfo.phoneNumber} />
        </div>
      </div>
      <div className='flex gap-2 flex-col md:flex-row w-full'>
        <div className='flex flex-col w-full md:w-1/2'>
          <Input label={'LinkedIn'} name={contactInfo?.linkedIn} handleChange={e => handleInfoChange('linkedIn', e.target.value)} value={contactInfo.linkedIn} />
        </div>
        <div className='flex flex-col w-full md:w-1/2'>
          <Input label={'Github'} name={contactInfo?.github} handleChange={e => handleInfoChange('github', e.target.value)} value={contactInfo.github} />
        </div>
      </div>
      <Input label={'Portfolio / Website'} name={contactInfo.portfolio} handleChange={e => handleInfoChange('portfolio', e.target.value) } value={contactInfo.portfolio}/>
    </>
  )
}

export default ContactInfo
