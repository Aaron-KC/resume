import LandingPage from './pages/LandingPage'
import './App.css'
import { UserContextProvider } from './context/userContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import ResumeBuilder from './pages/ResumeBuilder'


function App() {
  return (
    <>
      <UserContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/resume/:resumeId' element={<ResumeBuilder />} />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </>
  )
}

export default App
