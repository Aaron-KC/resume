import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMailUnreadOutline, IoArrowBack } from "react-icons/io5";
import { axiosInstance } from '../../utils/axiosInstance';
import toast from 'react-hot-toast';

const ResendVerification = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' }); // type: 'success' or 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
     const res = await axiosInstance.post('/auth/resendverificationemail', { email });
     console.log(res);

      if (res.data) {
        setStatus({ type: 'success', message: res.data.message });
        setEmail('');
      }
      toast.success(res.data.message || "Verification email sent successfully!");
      setLoading(false);
    } catch (err) {
      console.log(err);
      setStatus({ 
          type: 'error', 
          message: err.response?.data?.message || 'Something went wrong. Please try again.' 
      });
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-white flex flex-col items-center justify-center px-6'>
      
      {/* Brand Logo / Back to Home */}
      <Link to="/" className='absolute top-10 left-10 flex items-center gap-2 text-gray-500 hover:text-black transition-colors'>
        <IoArrowBack />
        <span className='font-bold'>Back to Home</span>
      </Link>

      <div className='w-full max-w-md bg-gray-100 rounded-2xl p-8 md:p-10 border border-gray-200 shadow-sm'>
        
        {/* Icon & Heading */}
        <div className='flex flex-col items-center text-center mb-8'>
          <div className='bg-white p-4 rounded-full shadow-sm mb-4'>
            <IoMailUnreadOutline className='text-4xl text-black' />
          </div>
          <h1 className='text-2xl font-bold'>Verify Your Email</h1>
          <p className='text-sm text-gray-500 mt-2'>
            Enter the email address associated with your account and we'll send you a new verification link.
          </p>
        </div>

        {/* Status Messages */}
        {status.message && (
          <div className={`mb-6 p-3 rounded-lg text-sm font-medium ${
            status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
          }`}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
          <div className='flex flex-col gap-2'>
            <label className='text-xs font-bold uppercase tracking-wider text-gray-400 pl-1'>
              Email Address
            </label>
            <input 
              type="email" 
              required
              placeholder="name@example.com"
              className='w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-black focus:outline-none transition-all'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className='btn2 w-full py-3.5 font-bold shadow-lg shadow-gray-200 flex justify-center items-center gap-2 disabled:opacity-70'
          >
            {loading ? (
              <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Send Verification Link"
            )}
          </button>
        </form>
      </div>

      {/* Aesthetic Footer Note */}
      <p className='mt-8 text-gray-400 text-xs'>
        &copy; 2026 ResumeForge — Build your career effortlessly.
      </p>
    </div>
  );
};

export default ResendVerification;