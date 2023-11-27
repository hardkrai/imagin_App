import React, { memo, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';
import { NavLink } from 'react-router-dom';

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user from local storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log('Parsed User:', parsedUser);
      setUser(parsedUser);
    }
  }, []);
  
  if (!user) return null;
  else {
    const isNotActivePostStyle = ' bg-orange-200 mr-2 gap-3 text-lime-950 text-lg  hover:text-orange-950 hover:bg-orange-200 hover:shadow-inner hover:shadow-orange-400 transition-all text-medium  border-2 border-orange-200  p-3  rounded-full duration-200 ease-in capitalize font-medium';
  const isActivePostStyle = '    transition-all ease-in-out duration-200 text-lime-950 bg-orange-200 font-bold shadow-inner shadow-orange-600  text-lg  border-2 border-orange-200 w-15 p-6 pt-3 pb-3  rounded-full font-extrabold';

    return (
      
      <div className="flex  gap-2 md:gap-5 w-auto mt-5 pb-7 z-10000 ml-1 lg:mr-3 xl:mr-3 md:mr-1 sm:mr-3 mr-3  bg-orange-50">
        <div className="flex justify-start items-center w-full px-2 rounded-full  bg-lime-950 outline-none text-orange-100  border-none  focus-within:shadow-sm">
          <IoMdSearch fontSize={21} className='flex ml-1 mb-1 mr-2 mt-1  font-bold text-2xl text-orange-50 rounded-full  ' />
          <input
            type='text'
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Wander'
            value={searchTerm}
            onFocus={() => navigate('/search')}
            className='p-2 w-full  focus:shadow-inner transition-all lg: ease-in-out duration-200 placeholder-lime-900 placeholder:text-lg placeholder:text-center  text-center rounded-full outline-none text-lime-950 bg-orange-50 border-b-lime-950 '
          />
        </div>
    
        <div className="flex gap-3 md:mr-6 lg:mr-0 xl:mr-0 ">
        <NavLink to={`user.profile/${user?.googleId} ` } className='hidden  md:block md:-ml-4 lg:block xl:block'>
          <img src={user?.imageUrl} width={50} height={20}  className='rounded-full md:rounded-full md:w-14 md:h-9 md:mt-1 lg:w-12 lg:mr-1 lg:mt-0 lg:h-11 ml-1 mr-0 '/>
          </NavLink>
          <NavLink to={'create-post'}   className={({ isActive }) => (isActive ? isActivePostStyle : isNotActivePostStyle)} >
            <IoMdAdd className='text-lg  '/>
          </NavLink>
          
           {/* {user && user?.googleId && (
            <Link to={`user-profile/${user?.googleId}`} className='md-block visible'>
              {user.image && (
                <img src={user?.imageUrl} className=' rounded-lg'  alt='user-profile' />
              )}
             
            </Link>
          )}  */}
          
        </div>
      </div>
      
    );
              }}    
export default memo(Navbar);
