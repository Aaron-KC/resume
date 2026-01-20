import React from 'react'
import Input from './Input'
import moment from 'moment'

const WorkExperience = ({ workExperience, updateArray, addElementInArray }) => {

  const addNewExperience = () => {
    const objToadd =       {
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      description: "",
    }
    addElementInArray(objToadd)
  }

  return (
    <>
      <p className='text-md font-semibold pb-4'>Work Experience</p>
      {
        workExperience.length > 0 && workExperience.map((workInfo, index) => {
          return <div className='border border-gray-200 p-3 rounded-md my-2' style={{ margin: '15px 0' }} key={workInfo._id}>
            <div className='flex gap-2 flex-col md:flex-row w-full'>
              <div className='flex flex-col w-full md:w-1/2'>
                <Input label={'Company'} handleChange={e => updateArray(index, 'company', e.target.value)} value={workInfo.company} />
              </div>
              <div className='flex flex-col w-full md:w-1/2'>
                <Input label={'Role'} handleChange={e => updateArray(index, 'role', e.target.value)} value={workInfo.role} />
              </div>
            </div>
            <div className='flex gap-2 flex-col md:flex-row w-full'>
              <div className='flex flex-col w-full md:w-1/2'>
                <Input label={'Start Date'} name={'date'} handleChange={e => updateArray(index, 'startDate', e.target.value)} value={moment(workInfo.startDate).format("YYYY-MM-DD")}/>
              </div>
              <div className='flex flex-col w-full md:w-1/2'>
                <Input label={'End Date'} name={'date'} handleChange={e => updateArray(index, 'endDate', e.target.value)} value={moment(workInfo.endDate).format("YYYY-MM-DD")}/>
              </div>
            </div>
            <div className='py-3 flex flex-col gap-3 w-full'>
              <label htmlFor={""} className='text-sm font-semibold'>Description</label>
              <textarea name="" id="" className='inputs resize-none' rows={4} onChange={e => updateArray(index, 'description', e.target.value)} value={workInfo.description}></textarea>
            </div>
          </div>
        })
      }
      <div className='py-5'>
        <button className='resume-btn' onClick={addNewExperience}><span className='lg:block hidden'>Add Work Experience</span></button>
      </div>
    </>
  )
}

export default WorkExperience
