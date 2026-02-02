import React from 'react'
import Input from './Input'

const Certifications = ({ certifications, updateArray, addElementInArray, deleteArrayElement }) => {
  return (
    <>
      <p className='text-md font-semibold pb-4'>Certifications</p>
      {
        certifications.length > 0 && certifications.map((certificate, index) => {
          return (
            <div className='border border-gray-200 p-3 rounded-md my-2 relative' style={{ margin: '15px 0' }} key={index}>
              
              {/* Delete Button */}
              <button 
                onClick={() => deleteArrayElement(index)}
                className="absolute top-2 right-2 text-red-500 hover:bg-red-50 p-1.5 rounded-full transition-colors z-10"
                title="Delete Certificate"
              >
                <svg xmlns="http://www.w3.org" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
              </button>

              <div className='flex gap-2 flex-col md:flex-row w-full pr-8'>
                <div className='flex flex-col w-full md:w-1/2'>
                  <Input label={'Certificate Title'} handleChange={e => updateArray(index, 'title', e.target.value)} value={certificate.title} />
                </div>
                <div className='flex flex-col w-full md:w-1/2'>
                  <Input label={'Issuer'} handleChange={e => updateArray(index, 'issuer', e.target.value)} value={certificate.issuer} />
                </div>
              </div>
              <div className='w-full'>
                <Input label={'Year'} handleChange={e => updateArray(index, 'year', e.target.value)} value={certificate.year} />
              </div>
            </div>
          )
        })
      }
      <div className='py-5'>
        <button className='resume-btn' onClick={() => addElementInArray({title: '', issuer: '', year: ''})}>
          <span className='lg:block hidden'>Add Certificate</span>
        </button>
      </div>
    </>
  )
}

export default Certifications
