import React from 'react'
import Input from './Input'

const Projects = ({ projects, updateArray, addElementInArray, deleteArrayElement }) => {
  return (
    <>
      <p className='text-md font-semibold pb-4'>Projects</p>

      {
        projects.length > 0 && projects.map((project, index) => {
          return (
            <div className='border border-gray-200 p-3 rounded-md my-2 relative' style={{ margin: '15px 0' }} key={index}>
              
              {/* Delete Button */}
              <button 
                onClick={() => deleteArrayElement(index)}
                className="absolute top-2 right-2 text-red-500 hover:bg-red-50 p-1.5 rounded-full transition-colors z-10"
                title="Delete Project"
              >
                <svg xmlns="http://www.w3.org" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
              </button>

              <div className="pr-8"> {/* Added padding so input doesn't hit the delete button */}
                <Input label={'Project Title'} name={project.title} handleChange={e => updateArray(index, 'title', e.target.value)} value={project.title} />
              </div>

              <div className='py-3 flex flex-col gap-3 w-full'>
                <label className='text-sm font-semibold'>Description</label>
                <textarea className='inputs resize-none' rows={4} onChange={e => updateArray(index, 'description', e.target.value)} value={project.description}></textarea>
              </div>

              <div className='flex gap-2 flex-col md:flex-row w-full'>
                <div className='flex flex-col w-full md:w-1/2'>
                  <Input label={'Github Link'} handleChange={e => updateArray(index, 'githubLink', e.target.value)} value={project.githubLink} />
                </div>
                <div className='flex flex-col w-full md:w-1/2'>
                  <Input label={'Live Demo URL'} handleChange={e => updateArray(index, 'demoUrl', e.target.value)} value={project.demoUrl} />
                </div>
              </div>
            </div>
          )
        })
      }

      <div className='py-5'>
        <button className='resume-btn' onClick={() => addElementInArray({title: '', description: '', githubLink: '', demoUrl: ''})}>
          <span className='lg:block hidden'>Add Project</span>
        </button>
      </div>
    </>
  )
}

export default Projects
