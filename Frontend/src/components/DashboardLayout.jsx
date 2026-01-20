import React, { useContext } from 'react'
import { userContext } from '../context/userContext'
import Navbar from './Navbar';

const DashboardLayout = ({children}) => {
  const {user} = useContext(userContext);
  return (
    <div className='min-h-[100vh] bg-gray-100'>
      <Navbar user={user} />
      {children}
    </div>
  )
}

export default DashboardLayout
