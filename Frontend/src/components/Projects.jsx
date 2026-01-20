import React from 'react'
import Input from './Input'

const Projects = ({ projects, updateArray, addElementInArray }) => {
  return (
    <>
      <p className='text-md font-semibold pb-4'>Projects</p>

      {
        projects.length > 0 && projects.map((project, index) => {
          return <div className='border border-gray-200 p-3 rounded-md my-2' style={{ margin: '15px 0' }} key={project._id}>
            <Input label={'Project Title'} name={project.title} handleChange={e => updateArray(index, 'title', e.target.value)} value={project.title} />
            <div className='py-3 flex flex-col gap-3 w-full'>
              <label htmlFor={""} className='text-sm font-semibold'>Description</label>
              <textarea name="" id="" className='inputs resize-none' rows={4} onChange={e => updateArray(index, 'description', e.target.value)} value={project.description}></textarea>
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
        })
      }

      <div className='py-5'>
        <button className='resume-btn' onClick={() => addElementInArray({title: '', description: '', githubLink: '', demoUrl: ''})}><span className='lg:block hidden'>Add Project</span></button>
      </div>
    </>
  )
}

export default Projects
