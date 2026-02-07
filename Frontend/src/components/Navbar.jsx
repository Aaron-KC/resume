import ProfileIconCard from '../components/ProfileIconCard';
import { Link } from 'react-router-dom';

const Navbar = ({ user }) => {
  return (
    <div className='flex flex-col gap-y-5 sm:gap-y-0 sm:flex-row justify-between items-center py-3 px-10 md:px-30 bg-white border-b border-gray-200'>
      <Link to={'/dashboard'} className='font-bold text-xl tracking-tight text-gray-800'>
        ResumeForge
      </Link>
      
      {user && (
        <div className='flex items-center'>
          <ProfileIconCard user={user} />
        </div>
      )}
    </div>
  )
}

export default Navbar;