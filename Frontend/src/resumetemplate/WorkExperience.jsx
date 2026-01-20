import React from 'react'
import moment from 'moment'
const WorkExperience = ({ experience }) => {
  return (
    <div className='py-2'>
      <div className='flex justify-between'>
        <p className='text-sm font-bold'>{experience.company}</p>
        {
          experience.startDate && experience.endDate && <p className='text-xs text-gray-500 italic'>{moment(experience.startDate).format('MMM YYYY')} - {moment(experience.endDate).format('MMM YYYY')}</p>
        }

      </div>
      <p className='text-xs py-1'>{experience.role}</p>
      <p className='italic text-xs'>
        {experience.description}
      </p>
    </div>
  )
}

export default WorkExperience
