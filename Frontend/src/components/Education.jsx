import React from 'react'
import Input from './Input'
import moment from 'moment'

const Education = ({ education, updateArray, addElementInArray }) => {

  const addNewDegree = () => {
    const objToadd = {
      degree: '',
      institution: '',
      startDate: "",
      endDate: ""
    }
    addElementInArray(objToadd)
  }
  return (
    <>
      <p className='text-md font-semibold pb-4'>Education</p>
      {
        education.length > 0 && education.map((qualification, index) => {
          return <div className='border border-gray-200 p-3 rounded-md my-2' style={{ margin: '15px 0' }} key={qualification._id}>
            <div className='flex gap-2 flex-col md:flex-row w-full'>
              <div className='flex flex-col w-full md:w-1/2'>
                <Input label={'Degree'} handleChange={e => updateArray(index, 'degree', e.target.value)} value={qualification.degree} />
              </div>
              <div className='flex flex-col w-full md:w-1/2'>
                <Input label={'Institution'} handleChange={e => updateArray(index, 'institution', e.target.value)} value={qualification.institution} />
              </div>
            </div>
            <div className='flex gap-2 flex-col md:flex-row w-full'>
              <div className='flex flex-col w-full md:w-1/2'>
                <Input label={'Start Date'} name={'date'} handleChange={e => updateArray(index, 'startDate', e.target.value)} value={moment(qualification.startDate).format('YYYY-MM-DD')} />
              </div>
              <div className='flex flex-col w-full md:w-1/2'>
                <Input label={'End Date'} name={'date'} handleChange={e => updateArray(index, 'endDate', e.target.value)} value={moment(qualification.endDate).format('YYYY-MM-DD')} />
              </div>
            </div>
          </div>
        })
      }
      <div className='py-5'>
        <button className='resume-btn' onClick={addNewDegree}><span className='lg:block hidden'>Add Education</span></button>
      </div>
    </>
  )
}

export default Education
