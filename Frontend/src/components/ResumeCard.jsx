import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import getImageAverageColor from '../../utils/getColor';

const ResumeCard = ({ resume }) => {
  const [bgColor, setBgColor] = useState('#fff');
  const thumbnailUrl = resume.personalInformation.thumbnailUrl
  useEffect(() => {
    getImageAverageColor(thumbnailUrl, setBgColor)
  }, [])

  return (
    <Link className='bg-white border border-gray-300 hover:border-purple-400 flex flex-col overflow-hidden cursor-pointer h-[300px] rounded-sm' to={`/resume/${resume._id}`}>
      <div className={'h-[245px] w-full flex justify-center items-center'} style={{backgroundColor: bgColor}} >
        {
          thumbnailUrl && <img src={thumbnailUrl} className='h-full w-[195px] object-contain'/>
        }

      </div>
      <p className='font-bold text-sm pt-2 pl-2'>{resume.title}</p>
      <p className='text-xs text-gray-500 px-2'>Last Updated: {moment(resume.updatedAt).format('MMMM Do YYYY')}</p>
    </Link>
  )
}

export default ResumeCard
