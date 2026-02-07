import { useContext, useState } from 'react';
import { userContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom';
import ProfileIconCard from '../components/ProfileIconCard';
import { IoPersonCircleSharp } from 'react-icons/io5';
import { axiosInstance } from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

const ProfileSettings = () => {
  const user = useContext(userContext)?.user || { name: "", profileUrl: "" };
  const fetchUser = useContext(userContext)?.fetchUser;
  console.log(fetchUser)
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if(success) {
      fetchUser();
      setSuccess(false);
    }
  }, [success])

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setSelectedFile(file);
    };
    e.target.value = null; // Reset file input to allow re-uploading the same image if needed
  };

  const handleImageUpload = async () => {
    if (preview) {
      const formData = new FormData();
      formData.append('image', selectedFile);


      try {
        const res = await axiosInstance.post(API_PATHS.AUTH.UPDATE_IMAGE, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Image uploaded successfully:', res.data);
        toast.success("Profile Picture changed successfully!")
        setSuccess(true);

      } catch (error) {
        console.error('Error uploading image:', error);
      }

    }
  }

  return (
    <div className='px-20 py-5 min-h-screen bg-white'>
      {/* Header - Matching Landing Page */}
      <div className='flex justify-between items-center'>
        <span className='font-bold text-lg cursor-pointer' onClick={() => navigate('/')}>
          ResumeForge
        </span>
        <ProfileIconCard user={user} />
      </div>

      <div className='max-w-4xl mx-auto pt-16'>
        <div className='flex flex-col md:flex-row gap-12 items-start'>

          {/* Left Side: Text/Context */}
          <div className='md:w-1/2'>
            <h1 className='text-4xl font-bold mb-4'>Profile Settings</h1>
            <p className='text-gray-500 leading-relaxed'>
              Your profile picture helps recruiters recognize you.
              Upload a professional headshot to make your resumes feel more personal.
            </p>
          </div>

          {/* Right Side: Upload Card */}
          <div className='md:w-1/2 w-full bg-gray-100 rounded-xl p-8 flex flex-col items-center gap-6 border border-gray-200'>
            <div className='relative group'>
              <div className='w-40 h-40 rounded-full overflow-hidden bg-white border-4 border-white shadow-sm'>
                <img
                  src={preview || user?.profileUrl || <IoPersonCircleSharp className='h-full w-full object-cover text-gray-300' />}
                  className='w-full h-full object-cover'
                  alt="Avatar"
                />
              </div>
              <label className='absolute inset-0 flex items-center justify-center bg-black/50 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full'>
                Change Photo
                <input type="file" className='hidden' onChange={handleImagePreview} accept="image/*" />
              </label>
            </div>

            <div className='flex flex-col w-full gap-3'>
              <label className='btn1 text-center py-2.5 cursor-pointer text-sm font-semibold'>
                Select New Image
                <input type="file" className='hidden' onChange={handleImagePreview} accept="image/*" />
              </label>

              <button className='btn2 w-full py-2.5 text-sm font-semibold' onClick={handleImageUpload}>
                Save Changes
              </button>

              <button
                onClick={() => setPreview(null)}
                className='text-gray-400 hover:text-red-500 text-xs transition-colors py-1'
              >
                Reset to default
              </button>
            </div>
          </div>

        </div>

        {/* Requirements/Tips Section */}
        <div className='grid md:grid-cols-2 gap-6 mt-16 border-t border-gray-100 pt-10'>
          <div className='flex flex-col gap-2'>
            <h3 className='font-bold'>Image Requirements</h3>
            <ul className='text-sm text-gray-500 list-disc list-inside'>
              <li>Square aspect ratio recommended</li>
              <li>Maximum file size: 2MB</li>
              <li>Supports JPG, PNG, or WebP</li>
            </ul>
          </div>
          <div className='flex flex-col gap-2'>
            <h3 className='font-bold'>Privacy</h3>
            <p className='text-sm text-gray-500'>
              Your profile picture will be visible on all generated resumes unless manually toggled off in the editor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;