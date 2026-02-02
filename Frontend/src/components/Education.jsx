import React from 'react'
import Input from './Input'
import moment from 'moment'

const Education = ({ education, updateArray, addElementInArray, deleteArrayElement }) => {

  const addNewDegree = () => {
    const objToadd = {
      degree: '',
      institution: '',
      startDate: "",
      endDate: "",
      currentlyStudying: false
    }
    addElementInArray(objToadd)
  }

  const handleCheckboxChange = (index, isChecked) => {
    updateArray(index, 'currentlyStudying', isChecked);
    if (isChecked) {
      updateArray(index, 'endDate', "");
    }
  }

  return (
    <>
      <p className='text-md font-semibold pb-4'>Education</p>
      {
        education.length > 0 && education.map((qualification, index) => {
          return (
            <div className='border border-gray-200 p-3 rounded-md my-2 relative' style={{ margin: '15px 0' }} key={index}>
              
              {/* Delete Button */}
              <button 
                onClick={() => deleteArrayElement(index)}
                className="absolute top-2 right-2 text-red-500 hover:bg-red-50 p-1.5 rounded-full transition-colors"
                title="Delete Education"
              >
                <svg xmlns="http://www.w3.org" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
              </button>

              <div className='flex gap-2 flex-col md:flex-row w-full pr-8'>
                <div className='flex flex-col w-full md:w-1/2'>
                  <Input label={'Degree'} handleChange={e => updateArray(index, 'degree', e.target.value)} value={qualification.degree} />
                </div>
                <div className='flex flex-col w-full md:w-1/2'>
                  <Input label={'Institution'} handleChange={e => updateArray(index, 'institution', e.target.value)} value={qualification.institution} />
                </div>
              </div>

              <div className='flex gap-2 flex-col md:flex-row w-full mt-2'>
                <div className='flex flex-col w-full md:w-1/2'>
                  <Input label={'Start Date'} name={'date'} handleChange={e => updateArray(index, 'startDate', e.target.value)} value={qualification.startDate ? moment(qualification.startDate).format('YYYY-MM-DD') : ''} />
                </div>
                
                <div className={`flex flex-col w-full md:w-1/2 ${qualification.currentlyStudying ? 'opacity-50 pointer-events-none' : ''}`}>
                  <Input 
                    label={'End Date'} 
                    name={'date'} 
                    handleChange={e => updateArray(index, 'endDate', e.target.value)} 
                    value={!qualification.currentlyStudying && qualification.endDate ? moment(qualification.endDate).format('YYYY-MM-DD') : ''} 
                    disabled={qualification.currentlyStudying}
                  />
                </div>
              </div>

              <div className='flex items-center gap-2 mt-3 px-1'>
                <input 
                  type="checkbox" 
                  id={`studying-${index}`}
                  checked={qualification.currentlyStudying || false} 
                  onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                  className="w-4 h-4 accent-blue-600 cursor-pointer"
                />
                <label htmlFor={`studying-${index}`} className="text-sm text-gray-600 cursor-pointer select-none">
                  I am currently studying here
                </label>
              </div>
            </div>
          )
        })
      }
      <div className='py-5'>
        <button className='resume-btn' onClick={addNewDegree}>
          <span className='lg:block hidden'>Add Education</span>
        </button>
      </div>
    </>
  )
}

export default Education

