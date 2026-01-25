import React, { useState } from 'react'
import Input from './Input'
import { RxCross1 } from 'react-icons/rx'
import { axiosInstance } from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import toast from 'react-hot-toast'

const CreateResume = ({ open, navigate, create, oldTitle, handleString }) => {
  const [title, setTitle] = useState(create ? "" : oldTitle)
  const [err, setErr] = useState("")

  const handleChange = e => {
    setTitle(e.target.value)
  }

  const handleSubmit = async () => {
    try {
      if (!title.trim()) {
        setErr("title mustn't be Empty!");
      }
      if(create) {
        const res = await axiosInstance.post(API_PATHS.RESUME.CREATE_RESUME, {title});
  
        if (res.data) {
          if (res.data._id) {
            toast.success('Resume Created Successfully!')
            navigate(`/resume/${res.data._id}`)
          }
        }
      } else {
        handleString('title', title)
        open(false);
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setErr(err.response.data.message);
      } else {
        setErr('Something Went Wrong!');
      }
    }
  }

  return (
    <div className='bg-white w-[90vw] md:w-[40vw] lg:w-[30vw] p-5 rounded-lg relative'>
      <p className='font-bold text-xl'>{
          create ? 'Create New Resume': 'Update Resume Title'
        }</p>
      <p className='text-xs text-gray-500 font-normal pt-1 pb-2'>{
          create && 'Get your resume a title to get started. You can edit all details later.'
        }</p>
      <Input label={'Resume Title'} placeholder={"John's Resume"} name={'title'} handleChange={handleChange} value={title}/>
      <button className='btn2 w-full' style={{ margin: '10px 0' }} onClick={handleSubmit}>{
       create ? 'Create Resume': 'Update Resume' 
      }
      </button>
      {
        err && <p className='text-red-600 text-sm py-2 font-medium'>{err}</p>
      }
      <RxCross1 className='absolute top-5 right-6 cursor-pointer' onClick={() => open(false)} />
    </div>
  )
}

export default CreateResume
