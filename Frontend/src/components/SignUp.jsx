import { useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import Input from './Input'
import { axiosInstance } from '../utils/axiosInstance'
import { API_PATHS } from '../utils/apiPaths';
import { validateCredentials } from '../utils/validateCredentials';
import ProfileImage from './ProfileImage';



const SignUp = ({ open, mode }) => {
  const [reg, setReg] = useState({ name: '', email: '', password: '', image: '' });
  const [image, setImage] = useState('');
  const [preview, setPreview] = useState('');
  const [err, setErr] = useState(null);

  const handleChange = e => {
    setReg({ ...reg, [e.target.name]: e.target.value })
  }

  const handleImage = e => {
    const file = e.target.files[0];

    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setReg({ ...reg, image: file });
      setImage(file.name);
      setPreview(fileUrl);
    }
    console.log(file)
  }
  

  const handleSignUp = async () => {
    try {

     const result =  validateCredentials(reg.email, reg.password);

     if(!result.isEmailValid || !result.isPasswordStrong) {
      setErr(result.message)
      return;
     }
      // const formData = new FormData();

      // for (let key in reg) {
      //   formData.append(key, reg[key])
      // }
      // console.log(...formData);
      const res = await axiosInstance.post(API_PATHS.AUTH.REGISTER, reg)

      if (res.data) {
        mode('login')
      }
    } catch (err) {
      console.log(err)
      if (err.response && err.response.data) {
        setErr(err.response.data.message);
      } else {
        setErr('Something Went Wrong!');
      }
    }
  }

  console.log(reg)

  const deleteImage = () => {
    setImage("");
    setPreview("");
  }
  return (
    <>
      <p className='font-bold text-xl'>Create an Account</p>
      <p className='text-sm font-normal pt-1 pb-2'>Join us today by entering your details below</p>
      <div className='w-full flex justify-center py-3'>
        <ProfileImage preview={preview} deleteImage={deleteImage} handleImage={handleImage} image={image}/>
      </div>
      <Input label={'Full Name'} placeholder={'John'} name={'name'} value={reg.name} handleChange={handleChange} />
      <Input label={'Email Address'} placeholder={'john@example.com'} name={'email'} value={reg.email} handleChange={handleChange} />
      <Input label={'Password'} placeholder={'Min 8 characters'} name={'password'} value={reg.password} handleChange={handleChange} />
      {
        err && <p className='text-red-600 text-sm py-2 font-medium'>{err}</p>
      }
      <button className='btn2 w-full' style={{ margin: '10px 0' }} onClick={handleSignUp}>SIGN UP</button>
      <p className='text-sm'>Already have an account? <span className='text-purple-400 underline cursor-pointer' onClick={() => mode('login')}>Login</span></p>
      <RxCross1 className='absolute top-5 right-6 cursor-pointer' onClick={() => open(false)} />
    </>
  )
}

export default SignUp
