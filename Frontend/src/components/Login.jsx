import React, { useContext, useState } from 'react'
import Input from '../components/Input';
import { RxCross1 } from "react-icons/rx";
import { userContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom'

const Login = ({ open, mode }) => {
  const [user1, setUser1] = useState({ email: "", password: "" })
  const { updateUser, error } = useContext(userContext);
  const navigate = useNavigate();


  const handleChange = e => {
    setUser1({ ...user1, [e.target.name]: e.target.value })
  }

  const handleLogin = async () => {
    updateUser(user1, navigate);
  }


  return (
    <>
      <p className='font-bold text-xl'>Welcome Back</p>
      <p className='text-sm font-normal pt-1 pb-2'>Please enter your details to log in</p>

      <Input label={'Email Address'} placeholder={'john@example.com'} name={'email'} value={user1.email} handleChange={handleChange} />

      <div className='flex flex-col'>
        <Input label={'Password'} placeholder={'Min 8 characters'} name={'password'} value={user1.password} handleChange={handleChange} />
        {/* Forgot Password Link */}
        <span
          onClick={() => navigate('/resetpassword')}
          className='text-xs text-purple-400 underline cursor-pointer self-end mt-1'
        >
          Forgot Password?
        </span>
      </div>

      <button className='btn2 w-full' style={{ margin: '10px 0' }} onClick={handleLogin}>LOGIN</button>

      {error && (
        <div className="bg-red-50 border border-red-100 p-3 rounded-lg flex flex-col gap-1">
          <p className="text-sm text-red-600">{error.message}</p>
          {error.actionLink && (
            <a
              href={error.actionLink}
              className="text-xs font-bold text-red-700 underline hover:text-red-800 transition-colors"
            >
              {error.actionText}
            </a>
          )}
        </div>
      )}

      <p className='text-sm'>Don't have an account <span className='text-purple-400 underline cursor-pointer' onClick={() => mode('signup')}>Sign Up</span></p>
      <RxCross1 className='absolute top-5 right-6 cursor-pointer' onClick={() => open(false)} />
    </>
  )
}

export default Login
