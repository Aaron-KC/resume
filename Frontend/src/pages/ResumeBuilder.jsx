import React, { useContext, useEffect, useRef, useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { useNavigate, useParams } from 'react-router-dom'
import { axiosInstance } from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import TitleBox from '../components/TitleBox';
import PersonalInformation from '../components/PersonalInformation';
import ProgressBar from '../components/ProgressBar';
import ContactInfo from '../components/ContactInfo';
import WorkExperience from '../components/WorkExperience';
import Education from '../components/Education';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Certifications from '../components/Certifications';
import AdditionalInfo from '../components/AdditionalInfo';
import Modal from '../components/Modal';
import CreateResume from '../components/CreateResume';
import { getValidationErrors } from '../../utils/validateForm';
import TemplateOne from '../resumetemplate/TemplateOne';
import toast from 'react-hot-toast'
import { captureElement } from '../../utils/generatethumbnail';
import { toBlob } from 'html-to-image';
import ThemeSelector from '../components/ThemeSelector';
import { themeColorPalette } from '../../utils/themes';
import { userContext } from '../context/userContext';



const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const [resume, setResume] = useState({
    personalInformation: {
      profileUrl: "",
     fullName: "", 
      description: "",
      summary: "",
      thumbnailUrl: ""
    },
    contactInformation: {
      address: "",
      email: "",
      phoneNumber: "",
      linkedIn: "",
      github: "",
      portfolio: "",
    },
    theme: {
      template: [],
      colorPalette: [],
    },
    workExperience: [
      {
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    education: [
      {
        degree: "",
        institution: "",
        startDate: "",
        endDate: "",
      },
    ],
    skills: [
      {
        name: "",
        proficiency: "",
      },
    ],
    projects: [
      {
        title: "",
        description: "",
        githubLink: "",
        demoUrl: "",
      },
    ],
    certifications: [
      {
        title: "",
        issuer: "",
        year: "",
      },
    ],
    additionalInfo: [
      {
        language: "",
        proficiency: "",
      },
    ],
    interests: []
  })
  const [openModal, setOpenModal] = useState(false)
  const subpages = ['profile-info', 'contact-info', 'work-experience', 'education', 'skills', 'projects', 'certifications', 'additional-info']
  const [subpage, setSubpage] = useState(0)
  const [errors, setErrors] = useState([])
  const [preview, setPreview] = useState("");
  const [images, setImages] = useState({ profilePic: '', thumbnailPic: '' })
  const [changeTheme, setChangeTheme] = useState(false);
  const thumbnailref = useRef(null);
  const navigate = useNavigate();
  const [index, setIndex] = useState(-1)
  const [template, setTemplate] = useState('')
  const [progress, setProgress] = useState(0)
  const {user, loading} = useContext(userContext)

  console.log(resume)

  if(!user && !loading) {
    navigate('/')
  }


  console.log(`template is ${template}`)
  const getResumeById = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.RESUME.GET_RESUME_BY_ID + resumeId)
      if (res.data) {
        setResume(res.data)
        if(res.data.theme.template.length > 0) {
          setTemplate(res.data.theme.template[0].id)
        }
      }
    } catch (e) {
      console.log(e)
    }
  }
  console.log(resume);
  useEffect(() => {
    getResumeById();
  }, [resumeId])


  const handleProgress = () => {
    const lastIndex = subpages.length - 1

    let percent = Math.floor(subpage / lastIndex * 100)

    setProgress(percent)
  }


  const handleString = (key, value) => {
    setResume(prev => ({ ...prev, [key]: value }))
  }

  const handlePreviewImage = e => {
    const file = e.target.files[0]
    console.log(file)

    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setImages({ ...images, profilePic: file })
    }
  }
  const handleImageDeletion = () => {
    console.log("function called")
    if (resume.personalInformation.profileUrl) {
      handleObjects("personalInformation", "profileUrl", "")
    } else {
      setPreview("")
    }
    setImages({ ...images, profilePic: "" })
  }

  console.log(resume.personalInformation.profileUrl ? resume.personalInformation.profileUrl : 'empty', images)

  const handleMultiStepFrom = type => {
    if (type == 'increase') {
      const error = getValidationErrors(resume)
      if (error[subpage]) {
        setErrors(error[subpage])
        return;
      }
      if (subpage < subpages.length - 1) {
        setSubpage(prev => prev + 1)
      }
    } else {
      subpage > 0 ? setSubpage(prev => prev - 1) : setOpenModal(true)
    }
    setErrors([])
  }

  useEffect(() => {
    handleProgress()
  }, [subpage])

  const updateArray = (mainProperty, index, key, value) => {
    setResume(prev => {
      const requiredArray = prev[mainProperty];

      if (!key) {
        requiredArray[index] = value;
        return {
          ...prev, [mainProperty]: requiredArray
        }
      }

      let objToChange = requiredArray[index];

      objToChange = { ...objToChange, [key]: value }

      requiredArray[index] = objToChange;

      return {
        ...prev, [mainProperty]: requiredArray
      }
    })
  }
  console.log(images)

  useEffect(() => {
    toBlob(thumbnailref.current, { quality: 0.8 }).then(blob => {
      setImages({ ...images, thumbnailPic: blob })
    })
  }, [thumbnailref.current, preview])

  const updateResume = async () => {
    let personalInformation = {
      fullName: resume.personalInformation.fullName,
      description: resume.personalInformation.description,
      summary: resume.personalInformation.summary,
      profileUrl: resume.personalInformation.profileUrl,
      thumbnailUrl: resume.personalInformation.thumbnailUrl
    }

    let imagesToSend = { ...images }

    const blob = await toBlob(thumbnailref.current, { quality: 0.8 })
    imagesToSend = { ...images, thumbnailPic: blob }




    // if (imagesToSend.profilePic || imagesToSend.thumbnailPic) {
    //   const formData = new FormData()
    //   let empty = false;

    //   for (let key in imagesToSend) {
    //     if (images[key] === 'thumbnailPic') {
    //       formData.append(key, imagesToSend[key], `image.png`)
    //     } else {
    //       if (!imagesToSend[key]) {
    //         empty = true;
    //       }
    //       formData.append(key, imagesToSend[key])
    //     }
    //   }

    //   console.log('images before sending', imagesToSend)

    //   const res = await axiosInstance.post(API_PATHS.RESUME.UPLOAD_RESUME_IMAGES + resumeId, formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   })
    //   console.log(res)
    //   if (res.data) {
    //     if (empty) {
    //       personalInformation = { ...personalInformation, profileUrl: "", thumbnailUrl: res.data.personalInformation.thumbnailUrl }
    //     } else {
    //       personalInformation = { ...personalInformation, profileUrl: res.data.personalInformation.profileUrl, thumbnailUrl: res.data.personalInformation.thumbnailUrl }
    //     }
    //     toast.success('file uploaded successfully!')
    //   } else {
    //     toast.error('file couldnot be uploaded')
    //   }
    // }

    const res = await axiosInstance.put(API_PATHS.RESUME.UPDATE_RESUME + resumeId, { ...resume, personalInformation })
    if (res.data) {
      console.log(res.data)
      toast.success('Resume Updated Successfully!')
      navigate('/dashboard');
    } else {
      toast.error('Something Went Wrong!')
    }
  }


  const addElementInArray = (mainProperty, objToadd) => {
    setResume(prev => {
      let requiredArray = prev[mainProperty];

      console.log('req: ', requiredArray)

      requiredArray = [...requiredArray, objToadd];

      return {
        ...prev, [mainProperty]: requiredArray
      }
    })
  }

  const handleTheme = (property, array) => {
    setResume(prev => ({ ...prev, theme: { ...prev.theme, [property]: array } }))

  }


  const handleObjects = (mainProperty, key, value) => {
    setResume(prev => ({
      ...prev, [mainProperty]: {
        ...prev[mainProperty], [key]: value
      }
    }))
  }
  return (
    <DashboardLayout>
      <div className='md:px-20 px-2 py-5 flex flex-col gap-3'>
        <TitleBox title={resume.title} handleString={handleString} open={setChangeTheme} id={resumeId} navigate={navigate} ref={thumbnailref}/>
        <div className='grid grid-cols-1 xl:grid-cols-2 gap-2'>
          <div className='w-full bg-white px-8 pt-6 pb-2 rounded-md border border-gray-300 relative overflow-hidden'>
            <ProgressBar width={progress}/>
            {
              subpages[subpage] === 'profile-info' && <PersonalInformation handleInfoChange={(key, value) => {
                handleObjects('personalInformation', key, value)
              }} personalInformation={resume?.personalInformation} handleImage={handlePreviewImage} image={preview} deleteImage={handleImageDeletion} />
            }
            {
              subpages[subpage] === 'contact-info' && <ContactInfo contactInfo={resume.contactInformation} handleInfoChange={(key, value) => handleObjects('contactInformation', key, value)} />
            }
            {
              subpages[subpage] === 'work-experience' && <WorkExperience workExperience={resume.workExperience} updateArray={(index, key, value) => updateArray("workExperience", index, key, value)} addElementInArray={objToadd => addElementInArray("workExperience", objToadd)} />
            }
            {
              subpages[subpage] === 'education' && <Education education={resume.education} updateArray={(index, key, value) => {
                updateArray('education', index, key, value);
              }} addElementInArray={(objToadd) => addElementInArray('education', objToadd)} />
            }
            {
              subpages[subpage] === 'skills' && <Skills skills={resume.skills} updateArray={(index, key, value) => updateArray('skills', index, key, value)} addElementInArray={objToadd => addElementInArray('skills', objToadd)} />
            }
            {
              subpages[subpage] === 'projects' && <Projects projects={resume.projects} updateArray={(index, key, value) => updateArray('projects', index, key, value)} addElementInArray={objToadd => addElementInArray('projects', objToadd)} />
            }
            {
              subpages[subpage] === 'certifications' && <Certifications certifications={resume.certifications} updateArray={(index, key, value) => updateArray('certifications', index, key, value)} addElementInArray={objToadd => addElementInArray('certifications', objToadd)} />
            }
            {
              subpages[subpage] === 'additional-info' && <AdditionalInfo additionalInfo={resume.additionalInfo} updateArray={updateArray} addElementInArray={addElementInArray} interests={resume.interests} />
            }
            {
              errors && errors.length > 0 && <p class="bg-red-50 text-red-700 border-l-4 border-red-600 p-4 rounded-md shadow-md text-sm font-medium animate-fade-in">
                {errors}
              </p>

            }
            <div className='flex justify-end w-full py-3 gap-2'>
              <button className='resume-btn ' onClick={() => handleMultiStepFrom('decrease')}><span className='lg:block hidden'>Back</span></button>
              <button className='resume-btn' onClick={updateResume}><span className='lg:block hidden'>Save & Exit</span></button>
              <button className='resume-btn' onClick={() => handleMultiStepFrom('increase')}><span className='lg:block hidden'>Next</span></button>
            </div>
          </div>
          <TemplateOne theme={resume.theme.colorPalette} resume={resume} preview={preview} thumbnailref={thumbnailref} template={template}/>
        </div>
      </div>

      {/* {
        openModal && <Modal >
          <CreateResume open={setOpenModal} navigate={navigate} create={false} oldTitle={resume.title} handleString={handleString} />
        </Modal>
      } */}

      {/* {
        changeTheme && <Modal>
          <ThemeSelector open={setChangeTheme} handleTheme={handleTheme} templateId={template} setTemplate={setTemplate} palette={resume.theme.colorPalette} setIndex={setIndex} index={index} />
        </Modal>
      } */}


    </DashboardLayout>
  )
}

export default ResumeBuilder
