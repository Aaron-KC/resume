import React from 'react'

const Ratings = ({updateArray, proficiency}) => {
  const handleClick = value => {
    updateArray(value);
  }

  return (
    <div className='flex gap-2 p-3 ps-1'>
      {
        Array.from({ length: 5 }).map((_, i) => i + 1).map((element) => {
          return <div className={element <= proficiency ? 'h-6 w-6 rounded-sm cursor-pointer bg-purple-500' : 'h-6 w-6 rounded-sm cursor-pointer bg-purple-100'} onClick={() => handleClick(element)} key={element}></div>
        })
      }
    </div>
  )
}

export default Ratings
