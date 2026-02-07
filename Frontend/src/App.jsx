import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import { UserContextProvider } from './context/userContext'
import { Toaster } from 'react-hot-toast'
import Dashboard from './pages/Dashboard'
import ResumeBuilder from './pages/ResumeBuilder'
import ProfileSettings from './pages/ProfileSettings'
import ResendVerification from './pages/ResendVerification'
import ResetPassword from './pages/ResetPassword'

const App = () => {
  return (
    <>
      <UserContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/resume/:resumeId' element={<ResumeBuilder />} />
            <Route path='/profile-settings' element={<ProfileSettings />} />
            <Route path='/resendverification' element={<ResendVerification />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>

      <Toaster
        position="bottom-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: '',
          duration: 5000,
          removeDelay: 1000,
          style: {
            background: '#363636',
            color: '#fff',
          },

          success: {
            duration: 2000,
            iconTheme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
    </>
  )
}

export default App

