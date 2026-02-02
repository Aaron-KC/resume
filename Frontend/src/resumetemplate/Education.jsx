import moment from 'moment'

const Education = ({ education }) => {
  return (
    <div className='py-2'>
      <div className='flex justify-between items-start'>
        <p className='text-sm font-bold'>{education.degree}</p>
        {/* Date Display Section */}
        {education.startDate && (
          <p className='text-xs text-gray-500 italic'>
            {moment(education.startDate).format('MMM YYYY')} – {
              education.currentlyStudying 
                ? 'Present' 
                : (education.endDate ? moment(education.endDate).format('MMM YYYY') : '')
            }
          </p>
        )}
      </div>
      <p className='text-xs text-gray-700'>{education.institution}</p>
    </div>
  )
}

export default Education
