import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AiFillBook } from 'react-icons/ai';
import { IoIosArrowForward } from 'react-icons/io';
import imaginlogo from '../assets/imaginlogo4.svg';
import { Category as CategoriesData } from '../utils/data';


const Sidebar = ({ setToggleSidebar, closeToggle }) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      console.log(storedUser)
      const image = user.imageUrl
      console.log("he",image)
      setUser(JSON.parse(storedUser));
    }
  }, []);


  const handleCloseSidebar = () => {
    if (closeToggle) {
      closeToggle(false);

    }
  };

  const isNotActiveStyle = 'flex   px-5 bg-amber-50 gap-3 text-lime-950  hover:text-lime-950 hover:bg-orange-200 font-bold hover:shadow-inner hover:shadow-orange-400 transition-all text-lg bg-transparent border-2 border-orange-200 ml-2 mr-2 p-3  rounded-full duration-200 ease-in-out capitalize font-medium';
  const isActiveStyle = 'flex  px-5 gap-3 rounded-full  transition-all  ease-in font-bold text-lg transition-all ease-in-out outline-none bg-lime-950  m-2 p-3 transition-all duration-200 ease-in-out capitalize text-xl  font-bold text-center justify-center text-orange-50 ';

  const isNotActiveUserStyle = 'flex   px-5 bg-transparent  gap-3 text-lime-950 mt-4  hover:text-orange-950 hover:bg-orange-200 hover:shadow-inner hover:shadow-orange-400 transition-all text-medium bg-transparent border-2 border-orange-200 ml-2 mr-2 p-2  rounded-full duration-200 ease-in-out capitalize font-medium';
  const isActiveUserStyle = 'flex   px-5  gap-3  mt-4  text-lime-950 bg-orange-200 font-medium shadow-inner shadow-orange-600 transition-all text-xl  border-2 border-orange-200 ml-2 mr-2 p-3  rounded-full duration-200 ease-in-out capitalize ';

 
  return (
    <div className="flex flex-col hover:shadow-inner hover:shadow-orange-200  justify-between bg-orange-100 m-2  pl-1    pb-3 mb-0 rounded-b-none text-orange-50 h-full overflow-y-scroll  p-2   mt-2 ml-2 rounded-xl mr-2 pr-0 min-w-210 hide-scrollbar">
      <div className="flex flex-col pr-0 ">
        <NavLink to="/" className="flex  gap-2 my-4 mb-6 justify-center pt-1 w-190 items-center xl:ml-2" onClick={handleCloseSidebar}>
          <img src={imaginlogo} alt="imaginlogo" className=" px-5  justify-center  hidden md:block  ml-auto mr-auto text-orange-400" />
        </NavLink>
        <div className="flex flex-col gap-5">
          <NavLink to="/" className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)} style={{justifyContent: 'center'}} onClick={handleCloseSidebar}>
            Home
          </NavLink>
          <h3 className="mt-2 px-5 mr-auto ml-auto  2xl:text-xl text-lime-950 text-xl font-bold ">EXPLORE</h3>
          {CategoriesData.slice(0, CategoriesData.length - 1).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
              key={category.name}
              onClick={handleCloseSidebar}
              
            >
              <img src={category.image} className='w-8 z-0 h-8 rounded-full shadow-sm' alt={`${category.name}-image`}/>
              {category.name}
            </NavLink>
          ))}
          
        </div>
      </div>
      {user && (
        <NavLink
          to={`/user.profile/${user?.googleId}`}
          className={({ isActive }) => (isActive ? isActiveUserStyle : isNotActiveUserStyle)} 
          onClick={(e) => {
            // e.preventDefault();
            // closeToggle();
          }}
        >
          <img src={user.imageUrl} className="w-10 h-10 rounded-full ml-1 " alt="user-profile" />
          <p className="mt-auto mb-auto text-lg ">{user.name}</p>
        </NavLink>
      )}
    </div>
  );
};

export default Sidebar;
// ml-2 mr-2 mt-2