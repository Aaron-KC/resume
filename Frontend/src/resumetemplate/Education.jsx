import React from 'react'
import moment from 'moment'

const Education = ({education}) => {
  return (
    <div className='py-2'>
      <p className='text-sm font-bold'>{education.degree}</p>
      <p className='text-xs '>{education.institution}</p>
      {
        education.startDate && education.endDate && <p className='text-xs text-gray-500 italic'>{moment(education.startDate).format('MMM YYYY')} - {moment(education.endDate).format('MMM YYYY')}</p>
      }
      
    </div>
  )
}

export default Education
