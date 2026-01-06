import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Input = ({ label, placeholder, handleChange, name, value }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className='py-3 flex flex-col gap-3 w-full'>
      <label htmlFor={name+label} className='text-sm font-semibold'>{label}</label>
      <div className='w-full relative'>
        <input type={name === 'password' ? (showPassword ? "text" : "password") : (name == 'date'? 'date': 'text')} className='inputs' placeholder={placeholder} name={name} onChange={handleChange} value={value} id={name+label}/>
      {
        name == 'password' && (showPassword ? <FaRegEye className='eye-icon' onClick={() => setShowPassword(!showPassword)}/> : <FaRegEyeSlash className='eye-icon' onClick={() => setShowPassword(!showPassword)}/>) 
      }
      </div>
    </div>
  )
}

export default Input
