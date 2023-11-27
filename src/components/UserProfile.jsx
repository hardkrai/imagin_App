import React, { useEffect, useState } from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { useParams, useNavigate } from 'react-router-dom'
import { userCreatedPostsQuery, userQuery, userSavedPostsQuery } from '../utils/data'
import { client } from '../client'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'
import { GoogleLogout } from 'react-google-login'
import { BiLogOutCircle } from "react-icons/bi";
import { BsDoorOpenFill } from "react-icons/bs";


const randomImage = 'http://source.unsplash.com/1600x900?nature,photography,technology,art'
const activateBtnStyles = "bg-orange-200 text-lime-950 font-bold text-xl p-2   rounded-full  transition-all ease-in duration-200 border-2 border-orange-200 shadow-inner shadow-orange-400 "
const notActiveBtnStyles = "bg-primary ml-0  mr-0 hover:bg-orange-200 hover:p-2 hover:pl-0 hover:pr-0 text-xl hover:pb-2 hover:pt-2 hover:rounded-full hover:border-2 hover:border-orange-200 text-Lime-950 font-semibold  transition-all ease-in duration-200  rounded-full w-20 outline-none"


const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null)
  const [text, setText] = useState('Created')
  const [activateBtn, setActivateBtn] = useState('Created')
  const navigate = useNavigate()
  const { userId } = useParams()
  

  const logout = () => {
    localStorage.clear()

    navigate('/login')
  }
 useEffect(() => {
  const query = userQuery(userId);

  client.fetch(query)
    .then((data) => {
      setUser(data[0]);
    })
    
}, [userId]);

  

  

  useEffect(() => {
    if (text === 'Created') {

      const CreatedPostsQuery = userCreatedPostsQuery(userId)

      client.fetch(CreatedPostsQuery)
        .then((data) => {
          setPosts(data)
        })

    } else {

      const fetchData = async () => {
        try {
          const savedPostsQuery = await userSavedPostsQuery(userId);
          console.log('userId:', userId);
          console.log('savedPostsQuery:', savedPostsQuery);
    
          const data = await client.fetch(savedPostsQuery, { userId });
          console.log('Saved Posts Data:', data);
    
          setPosts(data);
        } catch (error) {
          console.error('Error fetching saved posts:', error);
        }
      };
    
      fetchData();

    }
  }, [text, userId])
console.log("user", userId)

  // console.log("User Image URL:", user);


  if (!user) {

    return <div className="text-lime-950"><Spinner message="Loading Profile..." /></div>
  }
  return (
    <div className='relative pb-2 h-full justify-center items-center'>
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7 mt-3 ml-2 mr-2 rounded-lg ">
          <img src={randomImage}
            className='w-ful h-370 2xl:h-510 shadow-sm shadow-orange-900  rounded-lg object-cover ' alt="banner-image" />


{user  && (
  <img
    src={user.image}
    className='rounded-full flex ml-auto mr-auto w-20 border-orange-200 border-2 shadow-inner shadow-orange-600 text-center justify-center items-center h-20 -mt-10  object-cover '
    alt="user-image"
  />
)}

           <h1 className='font-bold text-lime-950 text-4xl capitalize text-center mt-3'>{user.userName}</h1>
          <div className="absolute top-0 z-1 right-0 p-2">
            {userId === user._id && (
              <GoogleLogout
                clientId={import.meta.env.VITE_REACT_APP_GOOGLE_API_TOKEN}
                render={(renderProps) => (
                  <button
                    type="button"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className="bg-orange-100 text-lime-950 hover:bg-orange-200 hover:shadow-inner hover:p-3  hover:border-orange-200 border-2 hover:shadow-orange-500 border-orange-100 text-xl text-bold flex justify-center items-center p-3 rounded-full cursor-pointer outline-none"
                  >
                    <BsDoorOpenFill/>
                  </button>
                )}
                onLogoutSuccess={logout}
                cookiePolicy="single_host_origin"
              />
            )}
          </div>
        </div>

        <div className="text-center mb-7 ">
          <button type='button ' onClick={(e) => {
            setText(e.target.textContent)
            setActivateBtn('Created')
          }}
            className={`${activateBtn === 'Created' ? activateBtnStyles : notActiveBtnStyles}`}
          >Created</button>
          <button type='button ' onClick={(e) => {
            setText(e.target.textContent)
            setActivateBtn('saved')
          }}
            className={`${activateBtn === 'saved' ? activateBtnStyles : notActiveBtnStyles}`}
            style={{marginLeft: "1rem"}}
          >Saved</button>
        </div>

        {posts?.length ? (
  <div className="mr-3 md:ml-0 sm:ml-0 lg:ml-0 xl:ml-0  md:mr-1 mdd:ml-2 mdr:ml-2 lg:mr-1 xl:mr-1 -ml-5">
    <MasonryLayout posts={posts} />
  </div>
) : (
  <div className="flex justify-center items-center animate-slide-fwd font-bold w-full text-xl text-lime-900">
   <img src="https://cdn.sanity.io/images/ziomnka5/production/4dcf21677bf2755418f0d08ba02e994e2c2a4c93-500x500.png" alt="Nothing to see here" className='ml-auto mr-auto mt-4'/>
  </div>
)}



      </div>
    </div>
  )
}

export default UserProfile