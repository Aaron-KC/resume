import React, { useEffect, useState } from 'react'
import { LuPencil } from "react-icons/lu";
import { LuPalette } from "react-icons/lu";
import { LuTrash } from "react-icons/lu";
import { FiDownload } from "react-icons/fi";
import { MdOutlineDone } from "react-icons/md";
import { axiosInstance } from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import toast from 'react-hot-toast';
import { useReactToPrint } from "react-to-print";
import { downloadResume } from '../../utils/downloadResume';

const TitleBox = ({ title, handleString, open, id, navigate, ref }) => {
  const [changeTitle, setChangeTitle] = useState(false);
  
  const download = async () => {
    try {
      console.log("download clicked")
      // console.log("outside ref", ref)
      await downloadResume(ref, title)
    } catch(e) {
      console.error(e)
    }
  }

  const handleResumeDelete = async () => {
    const res = await axiosInstance.delete(API_PATHS.RESUME.DELETE_RESUME + id)
    if(res.data) {
      toast.success(res.data.message)
      navigate('/dashboard')
    }
  }

  return (
    <div className='bg-white p-3 rounded-md border border-gray-300 flex justify-between'>

      {
        changeTitle ? <div className='flex md:items-center md:gap-2 flex-col md:flex-row w-1/2 md:w-1/4 gap-y-2 md:gap-y-0'>
          <input type='text' value={title} className='p-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-sm flex-1' onChange={e => handleString('title', e.target.value)}/>
          <MdOutlineDone className='text-green-800 text-md cursor-pointer' onClick={() => {setChangeTitle(!changeTitle); handleTitleChange()}} />
        </div> :
          <span className='font-semibold flex md:items-center md:gap-2 flex-col md:flex-row'>{title} <LuPencil className='text-sm text-purple-500 cursor-pointer' onClick={() => setChangeTitle(!changeTitle)} /></span>
      }

      <div className='flex gap-2'>
        <button className='resume-btn' onClick={() => open(true)}><LuPalette /><span className='lg:block hidden'>Change Theme</span></button>
        <button className='resume-btn' onClick={handleResumeDelete}><LuTrash /><span className='lg:block hidden'>Delete</span></button>
        <button className='resume-btn' onClick={download}><FiDownload /><span className='lg:block hidden'>Download</span></button>
      </div>
    </div>
  )
}

export default TitleBox
