import React from 'react'
import Input from './Input'
import Ratings from './Ratings'

const Skills = ({ skills, updateArray, addElementInArray }) => {
  return (
    <>
            <p className='text-md font-semibold pb-4'>Skills</p>

      {
        skills.length > 0 && skills.map((skill, index) => {
          return <div className='border border-gray-200 p-3 rounded-md my-2' style={{ margin: '15px 0' }}>
            <div className='flex gap-2 flex-col md:flex-row w-full'>
              <div className='flex flex-col w-full md:w-1/2'>
                <Input label={'Skill Name'} handleChange={e => updateArray(index, 'name', e.target.value)} value={skill.name} />
              </div>
              <div className='flex flex-col w-full md:w-1/2'>
                <div className='py-3 flex flex-col gap-3 w-full'>
                  <p className='text-sm font-semibold'>Profiency</p>
                </div>
                <Ratings updateArray={value => updateArray(index, 'proficiency', value)} proficiency={skill.proficiency} />
              </div>
            </div>
          </div>
        })
      }
      <div className='py-5'>
        <button className='resume-btn' onClick={() => addElementInArray({name: '', proficiency: 0})}><span className='lg:block hidden'>Add Skill</span></button>
      </div>

    </>
  )
}

export default Skills
