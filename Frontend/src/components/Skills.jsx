import Input from './Input'
import Ratings from './Ratings'

const Skills = ({ skills, updateArray, addElementInArray, deleteArrayElement }) => {
  return (
    <>
      <p className='text-md font-semibold pb-4'>Skills</p>

      {
        skills.length > 0 && skills.map((skill, index) => {
          return (
            <div className='border border-gray-200 p-3 rounded-md my-2 relative' style={{ margin: '15px 0' }} key={index}>
              
              {/* Delete Button */}
              <button 
                onClick={() => deleteArrayElement(index)}
                className="absolute top-2 right-2 text-red-500 hover:bg-red-50 p-1.5 rounded-full transition-colors"
                title="Delete Skill"
              >
                <svg xmlns="http://www.w3.org" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
              </button>

              <div className='flex gap-2 flex-col md:flex-row w-full pr-8'>
                <div className='flex flex-col w-full md:w-1/2'>
                  <Input label={'Skill Name'} handleChange={e => updateArray(index, 'name', e.target.value)} value={skill.name} />
                </div>
                <div className='flex flex-col w-full md:w-1/2'>
                  <div className='py-3 flex flex-col gap-3 w-full'>
                    <p className='text-sm font-semibold'>Proficiency</p>
                  </div>
                  <Ratings updateArray={value => updateArray(index, 'proficiency', value)} proficiency={skill.proficiency} />
                </div>
              </div>
            </div>
          )
        })
      }
      <div className='py-5'>
        <button className='resume-btn' onClick={() => addElementInArray({name: '', proficiency: 0})}>
          <span className='lg:block hidden'>Add Skill</span>
        </button>
      </div>
    </>
  )
}

export default Skills
