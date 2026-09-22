
// import { Sparkles } from 'lucide-react'
import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Home from './pages/Home/Home'
import Signup from './pages/Signup/Signup'
import Profile from './pages/Profile/Profile'
// import Notifications from './pages/Notifications/Notifications'
// import Settings from './pages/Settings/Settings'
import Notfound from './pages/Notfound/Notfound'
import Login from './pages/Login/Login'
import Layer from './assets/component/Layer/Layer'
import UserProvider from './assets/component/context/UserContext'
import ProtectRoute from './assets/component/ProtectRoute/ProtectRoute'
import { Toaster } from 'sonner'
function App() {

  return (
    <>
      {/* <h2 className='text-cyan-600'>Route W
      <Sparkles />
    </h2> */}
      <UserProvider>
        <BrowserRouter>
        <Routes>
          <Route path='/app' element={< Layer />}>
            < Route index  element={<ProtectRoute>
              <Home />
              </ProtectRoute>} />
            < Route path={`profile`} element={<ProtectRoute><Profile /></ProtectRoute>} />
            {/* < Route path={`notification`} element={<Notifications />} /> */}
            {/* < Route path={`setting`} element={<ProtectRoute><Settings /></ProtectRoute>} /> */}
            < Route path={`*`} element={<Notfound />} />
          </Route>
          < Route path={`login`} element={<Login />} />
          < Route path={`signup`} element={<Signup />} />
        </Routes>
      </BrowserRouter>
        <Toaster position='top-right'/>
      </UserProvider>

    </>
  )
}

export default App
