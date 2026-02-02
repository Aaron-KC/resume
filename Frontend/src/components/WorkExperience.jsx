import Input from './Input'
import moment from 'moment'
// If you use lucide-react or similar, import the Trash icon
// import { Trash2 } from 'lucide-react' 

const WorkExperience = ({ workExperience, updateArray, addElementInArray, deleteArrayElement }) => {

  const addNewExperience = () => {
    const objToadd = {
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      description: "",
      currentlyWorking: false 
    }
    addElementInArray(objToadd)
  }

  const handleCheckboxChange = (index, isChecked) => {
    updateArray(index, 'currentlyWorking', isChecked);
    if (isChecked) {
      updateArray(index, 'endDate', ""); 
    }
  }

  return (
    <>
      <div className='flex justify-between items-center pb-4'>
        <p className='text-md font-semibold'>Work Experience</p>
      </div>

      {workExperience.length > 0 && workExperience.map((workInfo, index) => {
        return (
          <div className='border border-gray-200 p-3 rounded-md my-2 relative' style={{ margin: '15px 0' }} key={index}>
            
            {/* Delete Button */}
            <button 
              onClick={() => deleteArrayElement(index)}
              className="absolute top-2 right-2 text-red-500 hover:bg-red-50 p-1 rounded-full transition-colors"
              title="Delete Entry"
            >
              {/* Simple SVG Trash Icon */}
              <svg xmlns="http://www.w3.org" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              </svg>
            </button>

            <div className='flex gap-2 flex-col md:flex-row w-full pr-8'> {/* Added padding right to avoid overlap with delete btn */}
              <div className='flex flex-col w-full md:w-1/2'>
                <Input label={'Company'} handleChange={e => updateArray(index, 'company', e.target.value)} value={workInfo.company} />
              </div>
              <div className='flex flex-col w-full md:w-1/2'>
                <Input label={'Role'} handleChange={e => updateArray(index, 'role', e.target.value)} value={workInfo.role} />
              </div>
            </div>
            
            {/* ... rest of your inputs (Start Date, End Date, Checkbox, Description) ... */}
            <div className='flex gap-2 flex-col md:flex-row w-full mt-2'>
              <div className='flex flex-col w-full md:w-1/2'>
                <Input label={'Start Date'} name={'date'} handleChange={e => updateArray(index, 'startDate', e.target.value)} value={workInfo.startDate ? moment(workInfo.startDate).format("YYYY-MM-DD") : ''}/>
              </div>
              <div className={`flex flex-col w-full md:w-1/2 ${workInfo.currentlyWorking ? 'opacity-50 pointer-events-none' : ''}`}>
                <Input 
                  label={'End Date'} 
                  name={'date'} 
                  handleChange={e => updateArray(index, 'endDate', e.target.value)} 
                  value={(!workInfo.currentlyWorking && workInfo.endDate) ? moment(workInfo.endDate).format("YYYY-MM-DD") : ''}
                  disabled={workInfo.currentlyWorking}
                />
              </div>
            </div>

            <div className='flex items-center gap-2 mt-3 px-1'>
              <input 
                type="checkbox" 
                id={`working-${index}`}
                checked={workInfo.currentlyWorking || false} 
                onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                className="w-4 h-4 accent-blue-600 cursor-pointer"
              />
              <label htmlFor={`working-${index}`} className="text-sm text-gray-600 cursor-pointer select-none">
                I am currently working in this role
              </label>
            </div>

            <div className='py-3 flex flex-col gap-3 w-full'>
              <label className='text-sm font-semibold'>Description</label>
              <textarea className='inputs resize-none' rows={4} onChange={e => updateArray(index, 'description', e.target.value)} value={workInfo.description}></textarea>
            </div>
          </div>
        )
      })}

      <div className='py-5'>
        <button className='resume-btn' onClick={addNewExperience}>
          <span className='lg:block hidden'>Add Work Experience</span>
        </button>
      </div>
    </>
  )
}

export default WorkExperience
