
import Home from './container/Home'
import './App.css'
import Login from './components/Login'
import Logout from './components/Logout'
import { Route,  Routes, useNavigate } from 'react-router-dom'

import LoadingBar from 'react-top-loading-bar'
import { useEffect } from 'react'
import { fetchUser } from './utils/fetchUser'


const App = (setUser) => {
  const navigate = useNavigate();

  useEffect(()=>{
    const user = fetchUser()

    if(!user) navigate('/login')
  })
  return (
    <>
    
     
    
    <Routes>
      <Route path='Login' element= {<Login setUser={setUser} />}/>
      <Route path ='/*' element={<Home />}/>
    </Routes>
   
    </>
  )
}

export default App


