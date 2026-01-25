import { RxPerson } from "react-icons/rx";
import { MdOutlineLocationOn, MdOutlinePhone } from "react-icons/md";
import { CiMail } from "react-icons/ci";
import { RiLinkedinLine, RiGithubLine } from "react-icons/ri";
import { LuWifiHigh } from "react-icons/lu";

import Contact from "./Contact";
import Title from "./Title";
import Education from "./Education";
import Language from "./Language";
import WorkExperience from "./WorkExperience";
import Projects from "./Projects";
import Skill from "./Skill";

const Resume = ({ theme, resume, preview, thumbnailref }) => {
  const { personalInformation, contactInformation } = resume;

  // ✅ STRICT CHECKS (do not change data structure)
  const hasSkills = resume.skills.some(
    (skill) => skill.name && skill.name.trim() !== ""
  );

  const hasLanguages = resume.additionalInfo.some(
    (info) => info.language && info.language.trim() !== ""
  );

  const hasEducation = resume.education.some(
    (edu) => edu.degree || edu.institution
  );

  const hasWorkExperience = resume.workExperience.some(
    (exp) => exp.company || exp.role
  );

  const hasProjects = resume.projects.some(
    (project) => project.title
  );

  const hasCertifications = resume.certifications.some(
    (cert) => cert.title
  );

  const hasInterests = resume.interests.some(
    (interest) => interest && interest.trim() !== ""
  );

  return (
    <div className="flex w-full bg-white" ref={thumbnailref}>
      {/* LEFT PANEL */}
      <div
        className="px-4 flex flex-col gap-y-3 w-2/6 py-8"
        style={{ backgroundColor: theme[0] }}
      >
        {/* Profile */}
        <div className="w-full flex items-center flex-col">
          <div
            className="h-[100px] w-[100px] rounded-full flex justify-center items-center overflow-hidden"
            style={{ backgroundColor: theme[1] }}
          >
            {(personalInformation.profileUrl || preview) ? (
              <img
                src={personalInformation.profileUrl || preview}
                className="h-full w-full object-cover"
              />
            ) : (
              <RxPerson className="text-4xl font-medium" />
            )}
          </div>

          {personalInformation.fullName && (
            <p className="font-bold text-lg pt-2">
              {personalInformation.fullName}
            </p>
          )}

          {personalInformation.description && (
            <p className="text-sm text-center">
              {personalInformation.description}
            </p>
          )}
        </div>

        {/* Contact Info */}
        {contactInformation.address && (
          <Contact icon={<MdOutlineLocationOn />} description={contactInformation.address} bgColor={theme[2]} />
        )}
        {contactInformation.email && (
          <Contact icon={<CiMail />} description={contactInformation.email} bgColor={theme[2]} />
        )}
        {contactInformation.phoneNumber && (
          <Contact icon={<MdOutlinePhone />} description={contactInformation.phoneNumber} bgColor={theme[2]} />
        )}
        {contactInformation.linkedIn && (
          <Contact icon={<RiLinkedinLine />} description={contactInformation.linkedIn} bgColor={theme[2]} />
        )}
        {contactInformation.github && (
          <Contact icon={<RiGithubLine />} description={contactInformation.github} bgColor={theme[2]} />
        )}
        {contactInformation.portfolio && (
          <Contact icon={<LuWifiHigh />} description={contactInformation.portfolio} bgColor={theme[2]} />
        )}

        {/* Education */}
        {hasEducation && (
          <div className="w-full">
            <Title text="Education" color={theme[1]} />
            {resume.education.map(
              (edu) =>
                (edu.degree || edu.institution) && (
                  <Education key={edu._id} education={edu} />
                )
            )}
          </div>
        )}

        {/* Languages */}
        {hasLanguages && (
          <div className="w-full">
            <Title text="Languages" color={theme[1]} />
            {resume.additionalInfo.map(
              (info) =>
                info.language && (
                  <Language
                    key={info._id}
                    info={info}
                    unselect={theme[2]}
                    select={theme[3]}
                  />
                )
            )}
          </div>
        )}
      </div>

      {/* RIGHT PANEL */}
      <div className="px-4 flex flex-col gap-y-3 w-4/6 py-8">
        {/* Summary */}
        {personalInformation.summary && (
          <div>
            <Title text="Professional Summary" color={theme[1]} />
            <p className="text-xs font-medium">
              {personalInformation.summary}
            </p>
          </div>
        )}

        {/* Work Experience */}
        {hasWorkExperience && (
          <div>
            <Title text="Work Experience" color={theme[1]} />
            {resume.workExperience.map(
              (exp) =>
                (exp.company || exp.role) && (
                  <WorkExperience key={exp._id} experience={exp} />
                )
            )}
          </div>
        )}

        {/* Projects */}
        {hasProjects && (
          <div>
            <Title text="Projects" color={theme[1]} />
            {resume.projects.map(
              (project) =>
                project.title && (
                  <Projects
                    key={project._id}
                    project={project}
                    color={theme[2]}
                  />
                )
            )}
          </div>
        )}

        {/* Skills */}
        {hasSkills && (
          <div>
            <Title text="Skills" color={theme[1]} />
            <div className="grid grid-cols-2">
              {resume.skills.map(
                (skill) =>
                  skill.name && (
                    <Skill
                      key={skill._id}
                      skill={skill}
                      unselect={theme[2]}
                      select={theme[3]}
                    />
                  )
              )}
            </div>
          </div>
        )}

        {/* Certifications */}
        {hasCertifications && (
          <div>
            <Title text="Certifications" color={theme[1]} />
            {resume.certifications.map(
              (cert) =>
                cert.title && (
                  <div key={cert._id} className="flex flex-col gap-1 text-xs">
                    <p className="font-bold">{cert.title}</p>
                    <div className="flex gap-2 items-center">
                      {cert.year && (
                        <div
                          className="py-1 px-2 rounded-md text-xs font-medium"
                          style={{ backgroundColor: theme[2] }}
                        >
                          {cert.year}
                        </div>
                      )}
                      {cert.issuer && <p>{cert.issuer}</p>}
                    </div>
                  </div>
                )
            )}
          </div>
        )}

        {/* Interests */}
        {hasInterests && (
          <div>
            <Title text="Interests" color={theme[1]} />
            <div className="flex gap-1 flex-wrap">
              {resume.interests.map(
                (interest, i) =>
                  interest && (
                    <div
                      key={i}
                      className="py-1 px-2 rounded-md text-xs font-medium"
                      style={{ backgroundColor: theme[2] }}
                    >
                      {interest}
                    </div>
                  )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resume;
