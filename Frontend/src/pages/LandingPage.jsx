import React, { useContext, useState } from 'react'
import Modal from '../components/Modal';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import { userContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProfileIconCard from '../components/ProfileIconCard';


const LandingPage = () => {
  const [openAuth, setOpenAuth] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const { user } = useContext(userContext);
  const navigate = useNavigate();

  const handleStart = () => {
    if (user) {
      navigate('/dashboard')
    } else {
      setOpenAuth(true);
    }
  }

  return (
    <div className='px-20 py-5'>
      <div className='flex justify-between items-center'>
        <span className='font-bold text-lg'>ResumeForge</span>
        {
          user ? <ProfileIconCard user={user} /> : <button className='btn1' onClick={() => setOpenAuth(true)}>Login / Sign Up</button>
        }
      </div>

      <div className='flex pt-18 flex-col md:flex-row gap-x-7'>
        <div className='flex flex-col gap-7 md:w-1/2 justify-center'>
          <p className='text-5xl font-bold leading-16'>Build Your <span className='text-radial-animate'>Resume <br /> Effortlessly
          </span>
          </p>
          <span>Craft a standout resume in minutes with our smart and intuitive resume <br /> builder.</span>
          <button className='btn2 w-fit' onClick={handleStart}>Get started</button>
        </div>
        <div className='w-full md:w-1/2 py-8 md:py-0 h-[350px]'>
          <img src="/landingP.png" className='w-full h-full object-cover object-center' />
        </div>
      </div>

      <div className='py-1'>
        <h1 className='text-center font-bold text-lg py-2 md:pt-16 md:pb-8'>Features That Make You Shine</h1>
        <div className='grid md:grid-cols-3 gap-4'>
          <div className='py-4 px-3 flex flex-col gap-3 bg-gray-100 rounded-md hover:shadow-md transition-shadow duration-300'>
            <h1 className='font-bold text-lg'>Easy Editing</h1>
            <p className='text-sm text-gray-500'>Update your resume sections with live preview and instant formatting</p>
          </div>
          <div className='py-4 px-3 flex flex-col gap-3 bg-gray-100 rounded-md hover:shadow-md transition-shadow duration-300'>
            <h1 className='font-bold text-lg'>Beautiful Templates</h1>
            <p className='text-sm text-gray-500'>Choose from modern, professional templates that are easy to customize</p>
          </div>
          <div className='py-4 px-3 flex flex-col gap-3 bg-gray-100 rounded-md hover:shadow-md transition-shadow duration-300'>
            <h1 className='font-bold text-lg'>One-Click Export</h1>
            <p className='text-sm text-gray-500'>Download your resume instantly as a high-quality PDF with one click</p>
          </div>
        </div>

        {
          openAuth && <Modal >
            <div className='bg-white py-4 px-6 md:w-[35vw] w-[90vw] rounded-lg relative'>
              {
                authMode === 'login' && <Login open={setOpenAuth} mode={setAuthMode} />
              }
              {
                authMode === 'signup' && <SignUp open={setOpenAuth} mode={setAuthMode} />
              }
            </div>
          </Modal>
        }
      </div>
    </div>
  )
}

export default LandingPage
