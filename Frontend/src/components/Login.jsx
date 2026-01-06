import { useState } from 'react'
import Input from '../components/Input';
import { RxCross1 } from "react-icons/rx";

const Login = ({open, mode}) => {
  const [user1, setUser1] = useState({email: "", password: ""})

  const handleChange = e => {
    setUser1({...user1, [e.target.name]: e.target.value})
  }

  return (
    <>
      <p className='font-bold text-xl'>Welcome Back</p>
      <p className='text-sm font-normal pt-1 pb-2'>Please enter your details to log in</p>
      <Input label={'Email Address'} placeholder={'john@example.com'} name={'email'} value={user1.email} handleChange={handleChange}/>
      <Input label={'Password'} placeholder={'Min 8 characters'} name={'password'} value={user1.password} handleChange={handleChange}/>
      <button className='btn2 w-full' style={{ margin: '10px 0' }}>LOGIN</button>
      <p className='text-sm'>Don't have an account <span className='text-purple-400 underline cursor-pointer' onClick={() => {}}>Sign Up</span></p>
      <RxCross1 className='absolute top-5 right-6 cursor-pointer' onClick={() => open(false)}/>
    </>
  )
}

export default Login
