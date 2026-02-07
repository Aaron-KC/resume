import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoKeyOutline, IoMailOutline, IoLockClosedOutline, IoArrowBack } from "react-icons/io5";
import { axiosInstance } from '../../utils/axiosInstance';
import toast from 'react-hot-toast';

const ResetPassword = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: Code, 3: New Password
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    code: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (step === 1) {
        const res = await axiosInstance.post("/auth/sendotp", { email: formData.email });
        if (res.data.message) {
          setStep(step + 1);
        }
      } else if (step === 2) {
        const res = await axiosInstance.post("/auth/verifyotp", { email: formData.email, code: formData.code });
        if (res.data.message) {
          setStep(step + 1);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/resetpassword", {
        email: formData.email,
        code: formData.code,
        newPassword: formData.password
      });
      toast.success(res?.data?.message || "Password reset successful! Please log in with your new password.");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
    // Submit final password change here
    console.log("Password reset successful");
  };

  return (
    <div className='min-h-screen bg-white flex flex-col items-center justify-center px-6'>
      <Link to="/" className='absolute top-10 left-10 flex items-center gap-2 text-gray-400 hover:text-black transition-colors'>
        <IoArrowBack />
        <span className='font-bold text-sm'>Back to Login</span>
      </Link>

      <div className='w-full max-w-md bg-gray-100 rounded-2xl p-8 border border-gray-200'>

        {/* Step Indicator */}
        <div className='flex justify-center gap-2 mb-8'>
          {[1, 2, 3].map((s) => (
            <div key={s} className={`h-1.5 w-10 rounded-full transition-colors duration-500 ${step >= s ? 'bg-black' : 'bg-gray-300'}`} />
          ))}
        </div>

        <div className='text-center mb-8'>
          <div className='inline-block bg-white p-4 rounded-full shadow-sm mb-4'>
            {step === 1 && <IoMailOutline className='text-3xl' />}
            {step === 2 && <IoKeyOutline className='text-3xl' />}
            {step === 3 && <IoLockClosedOutline className='text-3xl' />}
          </div>
          <h1 className='text-2xl font-bold'>
            {step === 1 && "Reset Password"}
            {step === 2 && "Enter Code"}
            {step === 3 && "New Password"}
          </h1>
          <p className='text-sm text-gray-500 mt-2'>
            {step === 1 && "Enter your email to receive a verification code."}
            {step === 2 && `We sent a 6-digit code to ${formData.email}`}
            {step === 3 && "Choose a strong password for your account."}
          </p>
        </div>

        <form onSubmit={step === 3 ? handleFinalSubmit : handleNextStep} className='flex flex-col gap-4'>

          {step === 1 && (
            <div className='flex flex-col gap-2'>
              <label className='text-[10px] font-bold uppercase tracking-wider text-gray-400 ml-1'>Email</label>
              <input
                name="email" type="email" required
                className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black outline-none transition-all'
                placeholder="email@example.com"
                value={formData.email} onChange={handleChange}
              />
            </div>
          )}

          {step === 2 && (
            <div className='flex flex-col gap-2'>
              <label className='text-[10px] font-bold uppercase tracking-wider text-gray-400 ml-1'>Verification Code</label>
              <input
                name="code" type="text" required maxLength="6"
                className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-center text-xl tracking-[1em] font-bold'
                placeholder="000000"
                value={formData.code} onChange={handleChange}
              />
            </div>
          )}

          {step === 3 && (
            <>
              <div className='flex flex-col gap-2'>
                <label className='text-[10px] font-bold uppercase tracking-wider text-gray-400 ml-1'>New Password</label>
                <input
                  name="password" type="password" required
                  className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black outline-none transition-all'
                  placeholder="••••••••"
                  value={formData.password} onChange={handleChange}
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label className='text-[10px] font-bold uppercase tracking-wider text-gray-400 ml-1'>Confirm Password</label>
                <input
                  name="confirmPassword" type="password" required
                  className='w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black outline-none transition-all'
                  placeholder="••••••••"
                  value={formData.confirmPassword} onChange={handleChange}
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className='btn2 w-full py-3.5 mt-2 flex justify-center items-center h-12'
            disabled={loading}
          >
            {loading ? (
              <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              step === 3 ? "Update Password" : "Continue"
            )}
          </button>
        </form>

        {step === 2 && (
          <button onClick={() => setStep(1)} className='w-full mt-4 text-xs text-gray-400 hover:text-black transition-colors'>
            Didn't get a code? <span className='font-bold underline'>Resend</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;