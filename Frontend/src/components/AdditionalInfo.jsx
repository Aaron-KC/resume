import Ratings from './Ratings'
import Input from './Input'

const AdditionalInfo = ({ additionalInfo, updateArray, addElementInArray, interests, deleteArrayElement }) => {
  return (
    <>
      <p className='text-md font-semibold pb-4'>Languages</p>
      {
        additionalInfo.length > 0 && additionalInfo.map((info, index) => {
          return (
            <div className='border border-gray-200 p-3 rounded-md my-2 relative' style={{ margin: '15px 0' }} key={`lang-${index}`}>
              {/* Delete Button for Language */}
              <button 
                onClick={() => deleteArrayElement('additionalInfo', index)}
                className="absolute top-2 right-2 text-red-500 hover:bg-red-50 p-1.5 rounded-full transition-colors"
              >
                <svg xmlns="http://www.w3.org" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
              </button>

              <div className='flex gap-2 flex-col md:flex-row w-full pr-8'>
                <div className='flex flex-col w-full md:w-1/2'>
                  <Input label={'Language'} handleChange={e => updateArray('additionalInfo', index, 'language', e.target.value)} value={info.language} />
                </div>
                <div className='flex flex-col w-full md:w-1/2'>
                  <div className='py-3 flex flex-col gap-3 w-full'>
                    <p className='text-sm font-semibold'>Proficiency</p>
                  </div>
                  <Ratings updateArray={value => updateArray('additionalInfo', index, 'proficiency', value)} proficiency={info.proficiency} />
                </div>
              </div>
            </div>
          )
        })
      }
      <div className='py-5'>
        <button className='resume-btn' onClick={() => addElementInArray('additionalInfo', { language: '', proficiency: 0 })}><span className='lg:block hidden'>Add Language</span></button>
      </div>

      <p className='text-md font-semibold pb-4'>Interests</p>
      <div className='flex flex-col gap-2'>
        {
          interests.length > 0 && interests.map((interest, index) => {
            return (
              <div className='flex items-center gap-2 w-full' key={`interest-${index}`}>
                <div className='flex-grow'>
                  <Input name={interest} handleChange={e => updateArray('interests', index, null, e.target.value)} value={interest} />
                </div>
                {/* Delete Button for Interest */}
                <button 
                  onClick={() => deleteArrayElement('interests', index)}
                  className="text-red-500 hover:bg-red-50 p-2 rounded-md transition-colors border border-gray-200"
                >
                   <svg xmlns="http://www.w3.org" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                </button>
              </div>
            )
          })
        }
      </div>
      <div className='py-5'>
        <button className='resume-btn' onClick={() => addElementInArray('interests', "")}><span className='lg:block hidden'>Add Interest</span></button>
      </div>
    </>
  )
}

export default AdditionalInfo
