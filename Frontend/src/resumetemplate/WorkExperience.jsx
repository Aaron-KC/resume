import moment from 'moment'

const WorkExperience = ({ experience }) => {
  return (
    <div className='py-2'>
      <div className='flex justify-between items-start'>
        <p className='text-sm font-bold'>{experience.company}</p>
        {experience.startDate && (
          <p className='text-xs text-gray-500 italic'>
            {moment(experience.startDate).format('MMM YYYY')} – {
              experience.currentlyWorking 
                ? 'Present' 
                : (experience.endDate ? moment(experience.endDate).format('MMM YYYY') : '')
            }
          </p>
        )}
      </div>
      <p className='text-xs py-1 font-medium'>{experience.role}</p>
      <p className='italic text-xs text-gray-700 whitespace-pre-line'>
        {experience.description}
      </p>
    </div>
  )
}

export default WorkExperience
