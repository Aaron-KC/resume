import { RxPerson } from "react-icons/rx";
import Contact from './Contact';
import { MdOutlineLocationOn } from "react-icons/md";
import { CiMail } from "react-icons/ci";
import { MdOutlinePhone } from "react-icons/md";
import { RiLinkedinLine } from "react-icons/ri";
import { RiGithubLine } from "react-icons/ri";
import { LuWifiHigh } from "react-icons/lu";
import Title from './Title';
import Education from './Education';
import Language from './Language';
import WorkExperience from './WorkExperience';
import Projects from './Projects';
import Skill from './Skill';

const Resume = ({ theme, resume, preview, thumbnailref }) => {
  return (
    <div className='w-full bg-white print-container' ref={thumbnailref}>
      {/* Header Section */}
      <div className='px-4 flex gap-x-7 w-full pt-8 items-center'>
        <div className='w-2/6'>
          <div className='w-full flex items-center flex-col'>
            <div className='h-[200px] w-[200px] rounded-lg flex justify-center items-center overflow-hidden' style={{ backgroundColor: `${theme[1]}` }}>
              {resume.personalInformation.profileUrl || preview ? 
                <img src={resume.personalInformation.profileUrl || preview} className='h-full w-full object-cover' alt="profile" />
                : <RxPerson className='text-4xl font-medium' />
              }
            </div>
          </div>
        </div>
        <div className='w-4/6 flex flex-col gap-2'>
          <div className='w-full flex items-center'>
            <div className='w-1/2 flex flex-col'>
              <p className='font-bold text-4xl pt-2'>{resume.personalInformation.fullName}</p>
              <p className='font-medium text-sm'>{resume.personalInformation.description}</p>
            </div>
            <div className='w-1/2'>
              {resume.contactInformation.email && <Contact description={resume.contactInformation.email} icon={<CiMail />} bgColor={theme[2]} />}
            </div>
          </div>
          <div className='w-full flex justify-between'>
            {resume.contactInformation.address && <Contact description={resume.contactInformation.address} icon={<MdOutlineLocationOn />} bgColor={theme[2]} />}
            {resume.contactInformation.phoneNumber && <Contact description={resume.contactInformation.phoneNumber} icon={<MdOutlinePhone />} bgColor={theme[2]} />}
          </div>
          <div className='w-full flex justify-between'>
            {resume.contactInformation.linkedIn && <Contact description={resume.contactInformation.linkedIn} icon={<RiLinkedinLine />} bgColor={theme[2]} />}
            {resume.contactInformation.github && <Contact description={resume.contactInformation.github} icon={<RiGithubLine />} bgColor={theme[2]} />}
          </div>
          {resume.contactInformation.portfolio && <Contact description={resume.contactInformation.portfolio} icon={<LuWifiHigh />} bgColor={theme[2]} />}
        </div>
      </div>

      <div className='px-4 flex flex-col gap-y-3 w-full py-8'>
        {/* Professional Summary */}
        {resume.personalInformation.summary && (
          <div>
            <Title text={'Professional Summary'} color={theme[1]} />
            <p className='text-xs font-medium'>{resume.personalInformation.summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {resume.workExperience.length > 0 && (
          <div>
            <Title text={'Work Experience'} color={theme[1]} />
            {resume.workExperience.map((exp, index) => <WorkExperience experience={exp} key={exp._id || index} />)}
          </div>
        )}

        {/* Projects */}
        {resume.projects.length > 0 && (
          <div>
            <Title text={'Projects'} color={theme[1]} />
            {resume.projects.map((project, index) => <Projects project={project} key={project._id || index} color={theme[2]} />)}
          </div>
        )}

        {/* Skills */}
        {resume.skills.length > 0 && (
          <div>
            <Title text={'Skills'} color={theme[1]} />
            <div className='grid grid-cols-2'>
              {resume.skills.map((skill, index) => <Skill skill={skill} key={skill._id || index} unselect={theme[2]} select={theme[3]} />)}
            </div>
          </div>
        )}

        {/* Certifications */}
        {resume.certifications.length > 0 && (
          <div>
            <Title text={'Certifications'} color={theme[1]} />
            {resume.certifications.map((certificate, index) => (
              <div className='flex flex-col gap-1 text-xs mb-2' key={certificate._id || index}>
                <p className='font-bold'>{certificate.title}</p>
                <div className='flex gap-2 items-center'>
                  {certificate.year && <div className='py-1 px-2 rounded-md text-xs font-medium' style={{ backgroundColor: theme[2] }}>{certificate.year}</div>}
                  <p>{certificate.issuer}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Interests */}
        {resume.interests.length > 0 && (
          <div>
            <Title text={'Interests'} color={theme[1]} />
            <div className='flex gap-1 flex-wrap'>
              {resume.interests.map((interest, index) => (
                <div key={index} className='py-1 px-2 rounded-md text-xs font-medium' style={{ backgroundColor: theme[2] }}>{interest}</div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {resume.education.length > 0 && (
          <div className='w-full'>
            <Title text={'Education'} color={theme[1]} />
            {resume.education.map((education, index) => <Education education={education} key={education._id || index} />)}
          </div>
        )}

        {/* Languages */}
        {resume.additionalInfo.length > 0 && (
          <div className='w-full'>
            <Title text={'Languages'} color={theme[1]} />
            {resume.additionalInfo.map((info, index) => <Language info={info} key={info._id || index} unselect={theme[2]} select={theme[3]} />)}
          </div>
        )}
      </div>
    </div>
  )
}

export default Resume
