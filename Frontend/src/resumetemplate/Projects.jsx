import { RiGithubLine } from "react-icons/ri";
import { LiaShareSquareSolid } from "react-icons/lia"

const Projects = ({ project, color }) => {
  return (
    <div className='flex flex-col gap-2'>
      <p className='text-sm font-bold pt-1'>{project.title}</p>
      <p className='text-gray-500 text-xs'>{project.description}</p>
      
      <div className='w-full flex-col'>
        {/* Only show GitHub section if githubLink exists */}
        {project.githubLink && (
          <div className='flex items-center gap-1 py-2'>
            <div className='h-[30px] w-[30px] rounded-full flex items-center justify-center text-xs' style={{ backgroundColor: color }}>
              <RiGithubLine />
            </div>
            <a className='underline' style={{fontSize: '10px'}} href={project.githubLink} target={"_blank"} rel="noreferrer">
              {project.githubLink}
            </a>
          </div>
        )}

        {/* Only show Demo section if demoUrl exists */}
        {project.demoUrl && (
          <div className='flex items-center gap-1'>
            <div className='h-[30px] w-[30px] rounded-full flex items-center justify-center text-xs' style={{ backgroundColor: color }}>
              <LiaShareSquareSolid />
            </div>
            <a className='underline' style={{fontSize: '10px'}} href={project.demoUrl} target={"_blank"} rel="noreferrer">
              {project.demoUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default Projects
