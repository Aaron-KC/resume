import React from 'react'

const Skill = ({skill, select, unselect}) => {
  return (
    <div className='flex justify-between items-center pe-3'>
      <p className='text-xs'>{skill.name}</p>
      {
        skill.proficiency &&       <div className='flex gap-1'>{
          Array.from({length: 5}, (_, i) => i + 1).map(item => {
            return <div className='h-[10px] w-[10px] rounded-full' style={{backgroundColor: item <= skill.proficiency ? select: unselect}}></div>
          })
        }</div>
      }
    </div>
  )
}

export default Skill
