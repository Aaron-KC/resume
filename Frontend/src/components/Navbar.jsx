import ProfileIconCard from '../components/ProfileIconCard';
import { Link } from 'react-router-dom';


const Navbar = ({user}) => {
  return (
    <div className='flex flex-col gap-y-5 sm:gap-y-0 sm:flex-row justify-between items-center py-3 px-30 bg-white border-b border-gray-200'>
      <Link to={'/dashboard'} className='font-bold text-lg'>Resume builder</Link>
      {
        user && <ProfileIconCard user={user} />  
      }
    </div>
  )
}

export default Navbar
