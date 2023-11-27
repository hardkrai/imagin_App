// Post component code
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { MdDownloadForOffline, MdBookmarkAdd, MdBookmarkAdded } from 'react-icons/md';
import { client, urlFor } from '../client';
import { fetchUser } from '../utils/fetchUser';
import { v4 as uuidv4 } from 'uuid';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { AiTwotoneDelete } from 'react-icons/ai';

const Post = ({ post: { postedBy, image, about, _id, destination, save, user } }) => {
  const [postHovered, setPostHovered] = useState(false);
  const userInfo = fetchUser();
  const userGoogleId = userInfo?.googleId || ''; // Added nullish coalescing
  const [alreadySaved, setAlreadySaved] = useState(!!save?.find((item) => item?.postedBy?._id === userGoogleId?.length));
  const navigate = useNavigate();
  const savePost = (id) => {
    const userInfo = fetchUser();
  
    if (!alreadySaved && userInfo && userInfo.googleId) {
      const { googleId } = userInfo;
  
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert('after', 'save[-1]', [
          {
            _key: uuidv4(),
            userId: googleId,
            postedBy: {
              _type: 'postedBy',
              _ref: user?.googleId, // No need for fallback to empty string
            },
          },
        ])
        .commit()
        .then(() => {
          // No need to trigger a re-render, directly update the button appearance
          setAlreadySaved(true);
        })
        .catch((error) => {
          console.error('Error saving post:', error);
        });
    } else {
      console.error('Unable to save post. User ID not available.');
    }
  };
  
  
  const deletePost = (postId) => {
    // Ensure that postId is defined before attempting to delete
    if (postId) {
      // Use Sanity's client to delete the post
      client
        .delete(postId)
        .then(() => {
          console.log('Post deleted successfully');
          // Additional actions after deleting the post
        })
        .catch((error) => {
          console.error('Error deleting post:', error);
        });
    } else {
      console.error('Post ID is undefined. Unable to delete post.');
    }
  };
  
  
  
  

 console.log("new", postedBy);
 console.log("img",postedBy?.image)

  return (
    <div className='mt-2 sm:mr-2  md:mr-2  lg:mr-2 xl:mr-2 mr-2 ml-10  sm:ml-5 xs:ml-1 xs:mr-2 md:ml-2 lg:ml-2 xl:ml-2' >
      <div
        className="relative cursor-pointer inline-block max-w-md hover:shadow-lg hover:shadow-orange-100 hover:backdrop-blur-sm  rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/post-detail/${_id}`)}
      >
        {postHovered && (
          <div className="absolute top-0 w-full flex flex-col justify-between p-2 pr-0 pt-2 pb-2 z-50">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {destination && (
                  <a
                    href={destination}
                    target="_blank"
                    rel="noreferrer"
                    className="outline-none w-25 h-9 text-lg text-lime-950 bg-orange-50 p-2 pt-1 rounded-full flex hover:opacity-100 opacity-50  hover:shadow-md shadow-purple-300"
                  >
                    <BsFillArrowUpRightCircleFill className="mt-1.5 mr-1" />
                    {destination.length > 20 ? destination.slice(8, 17) : destination}
                  </a>
                )}
                
                {postedBy?._id === userInfo?.googleId && (
                  <button
                    type='button'
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePost(_id); // Assuming deletePost is defined
                    }}
                    className='outline-none w-9 h-9 text-lg text-lime-950 bg-orange-50 p-2 rounded-full hover:opacity-100 opacity-50'
                  >
                    <AiTwotoneDelete/>
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                <a
                  href={`${urlFor(image)}?dl=`}
                  onClick={(e) => e.stopPropagation()}
                  download
                >
                  <MdDownloadForOffline className="w-9 text-xl h-9 text-orange-50 opacity-50 rounded-full flex items-center justify-center text-dark hover:opacity-100 hover:shadow-md shadow-purple-1000 outline-none" />
                </a>
                {alreadySaved ? (
                  <button
                    type="button"
                    className="outline-none w-9 h-9 text-lg text-lime-950 bg-orange-50 shadow-purple-1000 p-2 rounded-full hover:opacity-100 opacity-50"
                  >
                    <MdBookmarkAdded />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="outline-none w-9 h-9 text-lg text-lime-950 bg-orange-50 p-2 rounded-full hover:opacity-100 opacity-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      savePost(_id);
                    }}
                  >
                    <MdBookmarkAdd />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
       <img
  className="rounded-lg hover:scale-105 transition-all ease-in duration-200   xs:pr-0 sm:pr-0 md:pr-0 lg:pr-0 xl:pr-0 -pl-3"
  src={urlFor(image).width(600).url()}
  alt={`Post ${_id}`}
/>

      </div>
      {postedBy && (
        <Link
          to={`/user.profile/${postedBy?._id}`}
          className="flex gap-2 mt-2 items-center"
        >
          
          {postedBy?.image && (
           
            <img
              src={postedBy.image}
              className="w-8 h-8 rounded-full object-cover"
              alt="user-profile"
            />
          )}
          {postedBy.userName && (
            <p className="font-semibold capitalize mb-1 text-lime-950 hover:text-lime-800 w-auto">{postedBy.userName}</p>
          )}
          
        </Link>
      )}
    </div>
  );
};

export default Post;
