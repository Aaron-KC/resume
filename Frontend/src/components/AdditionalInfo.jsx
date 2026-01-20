import React from 'react'
import Ratings from './Ratings'
import Input from './Input'

const AdditionalInfo = ({ additionalInfo, updateArray, addElementInArray, interests }) => {
  console.log(interests)
  return (
    <>
      <p className='text-md font-semibold pb-4'>Languages </p>
      {
        additionalInfo.length > 0 && additionalInfo.map((info, index) => {
          return <div className='border border-gray-200 p-3 rounded-md my-2' style={{ margin: '15px 0' }}>
            <div className='flex gap-2 flex-col md:flex-row w-full'>
              <div className='flex flex-col w-full md:w-1/2'>
                <Input label={'Language'} handleChange={e => updateArray('additionalInfo', index, 'language', e.target.value)} value={info.language} />
              </div>
              <div className='flex flex-col w-full md:w-1/2'>
                <div className='py-3 flex flex-col gap-3 w-full'>
                  <p className='text-sm font-semibold'>Profiency</p>
                </div>
                <Ratings updateArray={value => updateArray('additionalInfo', index, 'proficiency', value)} proficiency={info.proficiency} />
              </div>
            </div>
          </div>
        })
      }
      <div className='py-5'>
        <button className='resume-btn' onClick={() => addElementInArray('additionalInfo', { language: '', proficiency: 0 })}><span className='lg:block hidden'>Add Language</span></button>
      </div>
      <p className='text-md font-semibold pb-4'>Interests </p>
      {
        interests.length > 0 && interests.map((interest, index) => {
          return <Input name={interest} handleChange={e => updateArray('interests', index, null, e.target.value)} value={interest} />
        })
      }
      <div className='py-5'>
        <button className='resume-btn' onClick={() => addElementInArray('interests', "")}><span className='lg:block hidden'>Add Interest</span></button>
      </div>
    </>
  )
}

export default AdditionalInfo
