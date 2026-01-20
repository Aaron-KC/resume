import React from 'react'
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
  console.log(thumbnailref)
  return (
    <div className='flex w-full bg-white' ref={thumbnailref}>
      <div className='px-4 flex flex-col gap-y-3 w-2/6 py-8' style={{ backgroundColor: `${theme[0]}` }}>
        <div className='w-full flex items-center flex-col'>
          <div className='h-[100px] w-[100px] rounded-full flex justify-center items-center overflow-hidden' style={{ backgroundColor: `${theme[1]}` }}>
            {
              resume.personalInformation.profileUrl || preview ? <img src={resume.personalInformation.profileUrl || preview} className='h-full w-full object-cover'/>
                :
              <RxPerson className='text-4xl font-medium' />

            }
          </div>
          <p className='font-bold text-lg pt-2'>{resume.personalInformation.fullName}</p>
          <p className='text-sm text-center '>{resume.personalInformation.description}</p>
        </div>
        <Contact description={resume.contactInformation.address} icon={<MdOutlineLocationOn />} bgColor={theme[2]} />
        <Contact description={resume.contactInformation.email} icon={<CiMail />} bgColor={theme[2]} />
        <Contact description={resume.contactInformation.phoneNumber} icon={<MdOutlinePhone />} bgColor={theme[2]} />
        <Contact description={resume.contactInformation.linkedIn} icon={<RiLinkedinLine />} bgColor={theme[2]} />
        <Contact description={resume.contactInformation.github} icon={<RiGithubLine />} bgColor={theme[2]} />
        <Contact description={resume.contactInformation.portfolio} icon={<LuWifiHigh />} bgColor={theme[2]} />
        <div className='w-full'>
          <Title text={'Education'} color={theme[1]} />
          {
            resume.education.length > 0 && resume.education.map(education => {
              return <Education education={education} key={education._id} />
            })
          }
        </div>
        <div className='w-full'>
          <Title text={'Languages'} color={theme[1]} />
          {
            resume.additionalInfo.length > 0 && resume.additionalInfo.map(info => {
              return <Language info={info} key={info._id} unselect={theme[2]} select={theme[3]} />
            })
          }
        </div>
      </div>
      <div className='px-4 flex flex-col gap-y-3 w-4/6 py-8'>
        <div>
          <Title text={'Professional Summary'} color={theme[1]} />
          <p className='text-xs font-medium'>
            {resume.personalInformation.summary}
          </p>
        </div>
        <div>
          <Title text={'Work Experience'} color={theme[1]} />
          {
            resume.workExperience.length > 0 && resume.workExperience.map(exp => {
              return <WorkExperience experience={exp} key={exp._id} />
            })
          }
        </div>
        <div>
          <Title text={'Projects'} color={theme[1]} />
          {
            resume.projects.length > 0 && resume.projects.map(project => {
              return <Projects project={project} key={project._id} color={theme[2]} />
            })
          }
        </div>
        <div>
          <Title text={'Skills'} color={theme[1]} />
          <div className='grid grid-cols-2'>
            {
              resume.skills.length > 0 && resume.skills.map(skill => {
                return <Skill skill={skill} key={skill._id} unselect={theme[2]} select={theme[3]} />
              })
            }
          </div>
        </div>
        <div>
          <Title text={'Certifications'} color={theme[1]} />
          {
            resume.certifications.length > 0 && resume.certifications.map(certificate => {
              return <div className='flex flex-col gap-1 text-xs'>
                <p className='font-bold'>{certificate.title}</p>
                <div className=' flex gap-2 items-center'>
                  {
                    certificate.year && <div className='py-1 px-2 rounded-md text-xs font-medium' style={{ backgroundColor: theme[2] }}>{certificate.year}</div>
                  }
                  <p>{certificate.issuer}</p>
                </div>
              </div>
            })
          }
        </div>
        <div>
          <Title text={'Interests'} color={theme[1]} />
          <div className='flex gap-1 flex-wrap'>
            {
              resume.interests.length > 0 && resume.interests.map(interest => {
                return <div className='py-1 px-2 rounded-md text-xs font-medium' style={{ backgroundColor: theme[2] }}>{interest}</div>

              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Resume
