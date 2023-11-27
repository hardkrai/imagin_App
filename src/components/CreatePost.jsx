import React from 'react'
import { useState, useEffect } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import { NavLink, useNavigate } from 'react-router-dom'
import Spinner from './Spinner'
import { client } from '../client'
import { Category } from '../utils/data'



const CreatePost = () => {

  const [user, setUser] = useState(null);
  console.log("useruseruseruseruser", user)
  useEffect(() => {
    // Fetch user from local storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      console.log('storeduser', storedUser)
    }
  }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount


  const [title, setTitle] = useState('')
  const [about, setAbout] = useState('')
  const [destination, setDestination] = useState('')
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [fields, setFields] = useState(false)
  // const [timeoutState, setTimeoutState] = useState('');

  const [category, setCategory] = useState('')
  const [imageAsset, setImageAsset] = useState(null)
  const [wrongImageType, setWrongImageType] = useState(false)

  const navigate = useNavigate()

  const uploadImage = (e) => {
    const { type, name } = e.target.files[0];
    if (type === 'image/png' || type === 'image/svg' || type === 'image/jpeg' || type === 'image/gif' || type === 'tiff' || type === 'image/jpg') {
      setWrongImageType(false)
      setLoading(true)

      client.assets
        .upload('image', e.target.files[0], { contentType: type, filename: name })
        .then((document) => {
          setImageAsset(document)
          setLoading(false)
        })
        .catch((error) => {
          console.log('Image Upload Error', error)
        })
    }
    else {
      setWrongImageType(true)
    }

  }
  const savePost = () => {
    if (title && about && destination && imageAsset?._id && category) {
      setUploading(true);
      const doc = {
        _type: 'post',
        title,
        about,
        destination,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset?._id,
          },
        },
        userId: user?.googleId,
        postedBy: {
          _type: 'postedBy',
          _ref: user?.googleId,
        },

        category,

      }
      client.create(doc)
        .then(() => {
          // console.log("doc",doc)
          setUploading(false)
          navigate('/')

        })
    }

    else {
      setFields(true);
      setTimeout(() => setFields(false), 2000)
      setUploading(false)
    }


  }

  return (
    <div className='flex xl:mt-40 xl:mb-10 lg:mt-20 flex-col justify-center z-500 items-center mt-5 lg:h-4/5 text-lime-950'>
      {fields && (
        <p className='text-lime-950 text-xl font-bold transition-all duration-150 ease-in'>
          Please Fill In All Of The Fields
        </p>
      )}

      <div className="flex lg:flex-row flex-col ml-10 mdd:ml-10 mds:ml-10 mr-10 mdd:mr-0 sm:mr-10 s:mr-10 small:mr-10 smaller:mr-10 smls:mr-10 sml:mr-10 lg:bg-orange-100 xl:bg-orange-100 sml:ml-10  smls:-ml-10 s:ml-10 small:ml-10 justify-center items-center md md:ml-10 md:bg-orange-50 md:-mr-1 smls:bg-orange-50   bg-orange-100  lg:p-5 p-3  w-full lg:w-auto lg: rounded-xl " >

        <div className="bg-orange-50 p-3 flex flex-0.7 w-full rounded-xl">
          <div className="flex justify-center items-center flex-col border-2 border-dotted border-orange-950 p-3 w-full h-420">
            {loading && (<Spinner />)}
            {wrongImageType && <p>Wrong Image Type</p>}
            {!imageAsset ? (

              <label >
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col justify-center text-lime-950 items-center">
                    <p className='font-bold text-3xl mt-12 text-lime-950 mb-4'>
                      <AiOutlineCloudUpload />
                    </p>
                    <p className='text-xl font-bold mb-10'>Click To Upload</p>
                  </div>
                  <p className='mt-32 text-lime-950'>
                    Use High Quality JPG, SVG, PNG, GIF FILES | Less Than 20 MB
                  </p>
                </div>
                <input
                  type='file'
                  name="upload-image"
                  onChange={uploadImage}
                  className='w-0 h-0 text-lime-950' />
              </label>

            ) : (
              <div className="relative h-full">
                <img src={imageAsset?.url} alt="uploaded-image" className='h-full w-full' />
                <button
                  type='button'
                  className='absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none text-orange-900 hover:shadow-md transition-all duration-500 ease-in-out '
                  onClick={() => setImageAsset(null)}>
                  <MdDelete />
                </button>
              </div>

            )}
          </div>
        </div>





        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Add the post title '
            className='outline-none text-2xl sm:text-2xl md:text-lg md:placeholder:text-lg transition-all ease-in duration-200 border-orange-200 font-medium bg-lime-950 rounded-lg pt-2 pb-2 pl-3 placeholder:text-orange-100 focus:text-lime-950 focus:placeholder-lime-950 text-orange-100 focus:bg-orange-300 focus:shadow-inner focus:shadow-orange-500'
          />



          {user && (
            <NavLink to={`/user.profile/${user?.googleId}`}>
              <div className="flex gap-2 my-2 border-2 border-orange-200 hover:bg-orange-300 hover:shadow-inner text-orange-100 hover:text-lime-950 hover:shadow-orange-500  items-center p-3 justify-start bg-lime-950 w-auto  rounded-lg">
                {/* <h2 className='font-medium text-xl text-orange-100'>Posted By: </h2> */}
                <img src={user.imageUrl} alt="user-profile"
                  className='w-10 h-10 rounded-full' />

                <p className=' font-bold text-xl capitalize'>{user.name}</p>
              </div>

            </NavLink>)}

          <input
            type='text'
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder='What is your post about'
            className='outline-none text-xl sm:text-2xl md:text-lg md:placeholder:text-lg font-medium bg-lime-950 rounded-lg pt-1 transition-all ease-in duration-200 pb-1 pl-3 placeholder:text-orange-100 focus:text-lime-950 focus:placeholder-lime-950 text-orange-100 focus:bg-orange-300 focus:shadow-inner focus:shadow-orange-500 placeholder:text-xl'
          />

          <input
            type='text'
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder='Add a destination link'
            className='outline-none text-xl sm:text-2xl md:text-lg md:placeholder:text-lg font-medium transition-all ease-in duration-200 bg-lime-950 rounded-lg pt-1 pb-1 pl-3 placeholder:text-orange-100 focus:text-lime-950 focus:placeholder-lime-950 text-orange-100 focus:bg-orange-300 focus:shadow-inner focus:shadow-orange-500 placeholder:text-xl'
          />

          <div className="flex flex-col ">
            <div className="ml-auto mr-auto">
              <p className=' font-semibold text-lg sm:text-xl text-lime-950 text-center  mb-3'>Choose Post Category</p>
              <select onChange={(e) => setCategory(e.target.value)}
                className='outline-none w-full pl-20 pr-20  border-b-2 bg-lime-950 p-2  rounded-md focus:bg-orange-50 focus:text-lime-950 text-orange-100 text-lg  cursor-pointer'>

                <option value="Other" className='bg-lime-950  focus:bg-orange-200 text-orange-50'> Select Category</option>
                {Category.map((category, index) => (

                  <option key={index} value={category.name} className='border-2 border-orange-100 focus:bg-orange-50  outline-none capitalize bg-lime-950 p-3 pb-3 text-orange-50'>
                    {category.name}
                  </option>
                ))}

              </select>
            </div>
            <div className="flex   justify-center
            items-center mt-2
             ">
              <button
                type='button'
                onClick={savePost}
                className='bg-orange-200 ml-5 shadow-inner shadow-orange-300 text-lime-950 font-bold p-2 rounded-full w-28 outline-none hover:bg-orange-300 hover:text-lime-950 hover:shadow-inner hover:shadow-orange-500 '
              >
                {uploading ? 'Uploading' : 'Upload'}
              </button>
            </div>


          </div>



        </div>
      </div>
    </div>
  )
}

export default CreatePost