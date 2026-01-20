import React from 'react'

const Title = ({text,color}) => {
  return (
    <div className='py-2 font-bold'>
      <p style={{borderBottom: '4px solid ' + color}} className='w-fit'>{text}</p>
    </div>
  )
}

export default Title
