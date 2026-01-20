import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../context/userContext'
import { AiOutlinePlusCircle } from "react-icons/ai";
import { axiosInstance } from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';
import ResumeCard from '../components/ResumeCard';
import Modal from '../components/Modal'
import CreateResume from '../components/CreateResume';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
const Dashboard = () => {
  const [openModal, setOpenModal] = useState(false);
  const { user, loading } = useContext(userContext)
  const [allResumes, setAllResumes] = useState([])
  const navigate = useNavigate();
  console.log(user);
  if(!user && !loading) {
    navigate('/')
  }

  const fetchAllResumes = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.RESUME.GETRESUMEBYUSER);
      setAllResumes(res.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllResumes();
  }, [])


  return (
    <DashboardLayout>
      <div className='md:px-20 px-2 py-7 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-3'>
        <div className='bg-white border border-gray-300 hover:border-purple-400 flex flex-col items-center justify-center cursor-pointer h-[300px] rounded-sm' onClick={() => setOpenModal(true)}>
          <div className='h-[35px] w-[35px] bg-purple-200 rounded-lg flex items-center justify-center'>
            <AiOutlinePlusCircle className='text-purple-500' />
          </div>
          <span className='py-3 text-xs font-semibold'>Add New Resume</span>
        </div>
        {
          allResumes.length > 0 && allResumes.map(resume => {
            return <ResumeCard resume={resume} key={resume._id} />
          })
        }
        {
          openModal && <Modal >
            <CreateResume open={setOpenModal} navigate={navigate} create={true}/>
          </Modal>
        }
      </div>
    </DashboardLayout>
  )
}

export default Dashboard
