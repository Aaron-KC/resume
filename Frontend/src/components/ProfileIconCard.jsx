import { useContext } from 'react'
import { IoPersonCircleSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { userContext } from '../context/userContext';

const ProfileIconCard = ({user}) => {
  const navigate= useNavigate();
  const  {setUser} = useContext(userContext)

  const handleLogout = () => {
    localStorage.clear()
    setUser(null)
    navigate("/")
  }

  return (
    <div className='flex gap-3 items-center'>
      {
        user.profileUrl ? <img src={user.profileUrl} className='h-10 w-10 object-cover rounded-full'/> : <IoPersonCircleSharp className='h-10 w-10'/>
      }

      <div className='flex flex-col gap-0'>
        <p className='font-bold text-sm'>Mike Doe</p>
        <p className='text-xs text-purple-500 font-semibold cursor-pointer' onClick={handleLogout}>Logout</p>
      </div>
    </div>
  )
}

export default ProfileIconCard
