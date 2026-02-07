import React, { useContext, useState } from 'react'
import { IoPersonCircleSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { userContext } from '../context/userContext'; // Optional icon for the menu

const ProfileIconCard = ({ user }) => {
  const navigate = useNavigate();
  const { setUser } = useContext(userContext);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/");
  };

  return (
    <div 
      className='relative' 
      onMouseEnter={() => setShowDropdown(true)} 
      onMouseLeave={() => setShowDropdown(false)}
    >
      {/* Trigger: The Icon Card */}
      <div className='flex gap-3 items-center cursor-pointer py-1'>
        {user.profileUrl ? (
          <img src={user.profileUrl} className='h-10 w-10 object-cover rounded-full border border-gray-100 shadow-sm' alt="profile" />
        ) : (
          <IoPersonCircleSharp className='h-10 w-10 text-gray-400' />
        )}

        <div className='flex flex-col gap-0'>
          <p className='font-bold text-sm text-gray-800'>{user.name || "User"}</p>
          <p className='text-[10px] text-gray-400 uppercase tracking-tighter font-bold'>Account</p>
        </div>
      </div>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div className='absolute right-0 top-full pt-2 w-52 z-50 animate-in fade-in zoom-in duration-150'>
          <div className='bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden'>
            
            {/* Change Profile Option */}
            <button 
              onClick={() => navigate("/profile-settings")}
              className='w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:pl-5 transition-all duration-200 border-b border-gray-50'
            >
              <div className='bg-gray-100 p-1.5 rounded-lg text-gray-500'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              Change Picture
            </button>

            {/* Logout Option */}
            <button 
              onClick={handleLogout}
              className='w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 hover:pl-5 transition-all duration-200'
            >
              <div className='bg-red-100 p-1.5 rounded-lg text-red-500'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileIconCard;