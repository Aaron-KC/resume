import React from 'react'
import Input from './Input'

const Certifications = ({ certifications, updateArray, addElementInArray }) => {
  return (
    <>
          <p className='text-md font-semibold pb-4'>Certifications</p>
      {
        certifications.length > 0 && certifications.map((certificate, index) => {
          return <div className='border border-gray-200 p-3 rounded-md my-2' style={{ margin: '15px 0' }} key={certificate._id}>
            <div className='flex gap-2 flex-col md:flex-row w-full'>
              <div className='flex flex-col w-full md:w-1/2'>
                <Input label={'Certificate Title'} handleChange={e => updateArray(index, 'title', e.target.value)} value={certificate.title} />
              </div>
              <div className='flex flex-col w-full md:w-1/2'>
                <Input label={'Issuer'} handleChange={e => updateArray(index, 'issuer', e.target.value)} value={certificate.issuer} />
              </div>
            </div>
            <Input label={'Year'} handleChange={e => updateArray(index, 'year', e.target.value)} value={certificate.year} />
          </div>
        })
      }
      <div className='py-5'>
        <button className='resume-btn' onClick={() => addElementInArray({title: '', issuer: '', year: ''})}><span className='lg:block hidden'>Add Certificate</span></button>
      </div>
    </>
  )
}

export default Certifications
