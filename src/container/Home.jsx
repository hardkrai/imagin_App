
import { useEffect, useState, useRef } from 'react'
import {HiMenu} from 'react-icons/hi'
import {AiOutlinePayCircle} from 'react-icons/ai'
import { AiFillCloseCircle } from 'react-icons/ai'
import {AiFillLayout} from 'react-icons/ai'
import { AiFillCodeSandboxCircle } from 'react-icons/ai'

import {Link, NavLink, Route, Routes} from 'react-router-dom'
import imaginlogo from '../assets/imaginlogo3.svg'
import Posts from './Posts'
import { userQuery } from '../utils/data'
import {Login, Logout, Sidebar, UserProfile} from '../components/index'
import {client} from '../client'
import {gapi} from 'gapi-script'
import { fetchUser } from '../utils/fetchUser'


function Home() {
  const [user, setUser]= useState([])
  const userInfo = fetchUser()
  const scrollRef = useRef(null)
  console.log("user",user)
  useEffect(()=>{
    const query =userQuery(userInfo?.googleId)

    client.fetch(query)
    .then((data)=>{
      console.log("data",data)
      setUser(data[0])
    })
  },[])

  const [toggleSidebar, setToggleSidebar] = useState(false)
  
  useEffect(()=>{
    if(scrollRef.current){scrollRef.current.scrollTo(0, 0)}
  },[])
  
  
  
  
  useEffect(()=>{
    function start(){
      gapi.client.init({
        clientID: import.meta.env.VITE_REACT_APP_GOOGLE_API_TOKEN,
        scope: ""
      })
    };

    gapi.load('client:auth2', start)
  })



  return (
    <>
    
    <div className="flex bg-orange-50 md:flex-row flex-col h-screen transition-height transaction-height ease-out duration-50 ">
      <div className="hidden md:flex h-screen bg-orange-50  flex-initial">
      <Sidebar user={ user && user }/>
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md opacity-100 bg-lime-950">
        
        
        <AiFillCodeSandboxCircle  className='w-10 h-10 cursor-pointer text-orange-200' onClick={()=>setToggleSidebar(true)}/>
        
        <Link to="/">
          <img src={imaginlogo}
          alt='imagin' 
          className='w-11'/>
        </Link>

         {user && (
        <NavLink
          to={`user.profile/${user?._id}`}
          className="flex   gap-2  items-center rounded-lg shadow-lg"
          
        >
          <img src={user?.image} className="w-10 h-10 rounded-full ml-1" alt="user-profile" />
          
        </NavLink>
        
      )} 

        </div>
        {toggleSidebar && (
        <div className="fixed w-full text-center h-screen bg-orange-50  overflow-y-auto scrollbar-hide  rounded-tr-lg rounded-tl-lg shadow-md z-10 transition-all  animate-slide-in ease-in-out">
          <div className="absolute w-full flex justify-end items-center p-2 mt-4">
            <AiFillCloseCircle fontSize={30} className='cursor-pointer text-lime-950' onClick={()=>setToggleSidebar(false)}/>
          </div>
          <Sidebar user={ user && user} closeToggle={()=>setToggleSidebar(false)} />

        </div>
      )}
      



      </div>


      <div className=" flex-1 h-screen bg-orange-50 overflow-y-scroll overflow-auto overflow-x-hidden md:mr-1 ml-2 xl:ml-0 lg:ml-0 sml:ml-0 sml:mr-1 smls:mr-1 s:ml-1 s:mr-2 smls:ml-0 " ref={scrollRef}>
            <Routes>

            <Route path='/user.profile/:userId' element={<UserProfile/>}/>

            <Route path='/*' element={<Posts user={user && user}/>}/>

            </Routes>

      </div>
      
    
    </div>
    </>
  )
}

export default Home
