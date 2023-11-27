import React, { useState, useEffect } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { client, urlFor } from '../client';
import { postDetailMorePostQuery, postDetailQuery } from '../utils/data';
import Spinner from './Spinner';
import { v4 as uuidv4 } from 'uuid'
import MasonryLayout from './MasonryLayout';

const PostDetail = ({ user }) => {
  const [posts, setposts] = useState(null);
  const [postDetail, setDetail] = useState(null);
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(null);
  const { postId } = useParams();

  const fetchPostDetails = () => {
    let query = postDetailQuery(postId);
    if (query) {
      client
        .fetch(query)
        .then((data) => {
          setDetail(data[0]);

          if (data[0]) {
            query = postDetailMorePostQuery(data[0]);

            client.fetch(query).then((res) => setposts(res));
          }
        });
    }
  };

  useEffect(() => {
    fetchPostDetails();
  }, [postId]);



  const addComment = () => {
    if (comment.trim() !== '') { // Check if the comment is not just whitespace
      setAddingComment(true);

      client
        .patch(postId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [
          {
            comment,
            _key: uuidv4(),
            postedBy: {
              _type: 'postedBy',
              _ref: user._id,
            },
          },
        ])
        .commit()
        .then(() => {
          fetchPostDetails();
          setComment('');
          setAddingComment(false);

        })
        .catch((error) => {
          console.error('Error adding comment:', error);
          setAddingComment(false);
        });
    }

  };




  if (!postDetail) return <Spinner className='text-lime-950' message="Loading Post" />;


  return (
    <>
      <div className='flex xl:flex-row  flex-col m-auto bg-orange-100 max-w-screen-xl rounded-t-xl  p-4 small:ml-8 s:ml-8 lg:mr-auto smls:ml-8 xxs:ml-5 sml:ml-8  rounded-3xl rounded-b-lg lg:ml-auto mdd:ml-10'  >
        <div className="flex flex-wrap justify-center mt-auto mb-auto items-center md:items-start flex-initial">
          <img
            src={postDetail?.image && urlFor(postDetail.image).url()}
            height={400}
            alt="post-image"
            className='rounded-t-3xl rounded-b-lg md:justify-center backdrop-blur-sm ml-2 mr-2'
          />
        </div>
        <div className="w-full p-5 flex-1 mt-2 xl:mt-0 xl:ml-3 lg:ml-3 lg:rounded-3xl lg:rounded-b-lg bg-orange-200 rounded-3xl rounded-b-lg md:rounded-t-lg  lg:mt-0 md:mt0 xl:min-w-620">
          <div className="flex items-center flex-wrap">
            <div className="flex gap-2 items-center">
              <a
                href={`${postDetail.image?.asset?.url}?dl=`}
                onClick={(e) => e.stopPropagation()}
                download
              >
                <MdDownloadForOffline className=" w-9 text-xl h-9 s:mr-12   opacity-75 lg:mr-80  rounded-full flex items-center justify-center text-lime-950 hover:opacity-100 hover:shadow-md  outline-none ml-2" />
              </a>
            </div>
            <div className=" flxe flex-wrap text-xl md:mt-auto s:mt-1 ss:-mt-10 ss:ml-auto font-bold text-lime-950 s:ml-3 mdd:mt-8 mdd:ml-auto   -mt-10 sss:mt-0 -ml-4  mds:mt-10 lg:ml-80 sm:mt-10  lg:mt-0 xl:mt-0 md:ml-60 ">
              <a href={postDetail.destination} target='_blank' rel='noreferrer' className=' flex flex-wrap hover:text-lime-950 opacity-75-mt-10 lg:-mt-10 small:-mt-10 sm:-mt-8 md:-mt-9 ml-60 xl:ml-auto lg:ml-80 s:-ml-8 lg:mr-0 flex-3 capitalize'>{postDetail.title}</a>
            </div>
            {/* <div className=" sm:hidden md:hidden lg:hidden xl:hidden mt-2  font-bold text-lime-950 visible ">
            <a href={postDetail.destination} target='_blank' rel='noreferrer' className='hover:text-gray-950 -mt-10 text-xl ml-40 flex-3 capitalize'>{postDetail.title.length>20? postDetail.title.slice(0,25) + "..." : postDetail.title}</a>
          </div> */}
          </div>


          <div className="   mt-6 gap-3 hidden ml-auto  lg:ml-16 xl:ml-0    w-auto lg:block md:hidden  ">

            {/* {postDetail.postedBy && (
              
            )} */}



            <input className='flex-1  bg-transparent placeholder:text-lime-950 placeholder:font-medium  active:shadow-orange-500 placeholder:text-xl  lg:w-auto lg:ml-60  text-xl text-orange-950 text-center border-lime-900 outline-none border-2 p-2 rounded-full focus:border-lime-800 transition-all ease-in-out duration-700 sm:ml-none pr-10 pl-10  ml-40 small:ml-60 xl:ml-20  mb-3 '
              placeholder='Comment'
              value={comment}
              onChange={(e) => setComment(e.target.value)} />

            <button
              type='button'
              className='bg-lime-950 hover:bg-orange-300 hover:shadow-inner hover:shadow-orange-500 border-2 border-orange-300 text-orange-100 hover:text-lime-950 rounded-full px-6 py-5  font-semibold ml-1 pt-3 pb-2  text-base outline-none transition-all ease-in-out duration-500 mr-0 '
              onClick={addComment}
            >
              {addingComment ? 'Posting...' : 'Post'}
            </button>

          </div>
          <h2 className='mt-5 font-semibold capitalize text-lime-950 text-center text-3xl hidden  lg:block'>Comments</h2>
          <div className="hidden lg:block max-h-370 overflow-y-auto bg-orange-100 m-2 rounded-xl p-2 pt-0 xl:w-500">

            {postDetail?.comments?.length ? (
              postDetail.comments.map((comment, i) => (
                <div className="flex gap-3 mt-5 items-center rounded-lg" key={i}>
                  <div className="flex flex-row bg-lime-950 w-full rounded-lg p-3">
                    <img src={postDetail.postedBy.image} className="font-semibold capitalize rounded-full w-6 h-6 text-gray-600 hover:text-gray-950" alt="User" />
                    <p className='font-semibold pl-2 pr-2 text-orange-200 capitalize cursor-pointer'>{`${comment.postedBy.userName}`}</p>
                    <p className='flex flex-4 break-words text-orange-100'>{comment?.comment}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className=" text-lime-950 text-xl text-center   "><img width={250} height={250} className="ml-auto mr-auto"src='https://cdn.sanity.io/images/ziomnka5/production/6c33d60ed8cb9cbed5e5d2285ba99cf3d4279eed-500x500.png'/></div>
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-2   mt-4 bg-orange-100 text-lime-950 p-2 items-center ml-8 justify-center rounded-2xl w-auto xxs:mr-3 md:ml-auto md:mr-auto xl:w-auto  xl:justify-center xl:items-center xl:ml-60 xl:mr-60 md:rounded-t-lg">
        {postDetail.postedBy && (
          <Link to={`/user.profile/${postDetail.postedBy._id}`} className="flex gap-2 ml-4 text-lime-950 items-center justify-center text-center">
            {/* {postDetail.postedBy.image && (
      <img
        src={postDetail.postedBy.image}
        className="w-8 h-8 rounded-full object-cover"
        alt="user-profile"
      />
    )} */}
            {postDetail.postedBy.userName && (
              <p className="font-semibold capitalize text-xl mt-1 text-lime-950 hover:text-lime-900 ">{postDetail.postedBy.userName}</p>
            )}
          </Link>
        )}

        <div>
          <p className='mt-4 text-lime-950 capitalize font-bold text-xl flex justify-end   pl-10 pb-3'>{postDetail.about}</p>
        </div>
      </div>
      <h2 className='mt-5 font-semibold capitalize text-lime-950 text-center mr-auto ml-8 text-3xl  visible lg:hidden'>Comments</h2>


      <div className="flex  mt-6 lg:ml-3 ml-10 gap-3 visible lg:hidden mb-2  ">

        {/* {postDetail.postedBy && (
      <Link to={`user-profile/${postDetail.postedBy?._id}`} className="flex gap-2 ml-4 items-center justify-center text-center">
       {postDetail.postedBy.userName && (
          <p className="font-semibold capitalize  text-xl mt-1 text-gray-600 hover:text-gray-950">{postDetail.postedBy.userName}</p>
        )}
        
      </Link>
    )} */}

        <input className='flex-1 bg-transparent text-lime-950 text-center  outline-none ml-4 border-2 p-2 border-lime-950 rounded-full focus:border-lime-900 placeholder:text-lime-950 transition-all ease-in-out duration-700 sm:ml-none   '
          placeholder='Comment'
          value={comment}
          onChange={(e) => setComment(e.target.value)} />
        <button
          type='button'
          className='bg-lime-950 mr-4 text-orange-50 hover:bg-orange-200 hover:text-lime-950 hover:border-1 hover:border-orange-300 hover:shadow-inner hover:shadow-orange-400 rounded-full px-6 py-2 font-semibold text-base outline-none transition-all ease-in duration-200  '
          onClick={addComment}
        >
          {addingComment ? 'Posting' : 'Post'}
        </button>

      </div>


      <div className="max-h-370 overflow-y-auto bg-orange-100 m-2 rounded-xl p-2 pt-0 visible ml-8 lg:hidden">
      {postDetail?.comments?.length ? (
  postDetail.comments.map((comment, i) => (
    <div className="flex gap-3 mt-5 items-center rounded-lg" key={i}>
      <div className="flex flex-row w-full p-2 rounded-xl bg-lime-950">
      <img src={postDetail.postedBy.image} className="font-semibold capitalize rounded-full w-6 h-6 text-gray-600 hover:text-gray-950" alt="User" />
        <p className='font-semibold pl-2 pr-2 capitalize text-orange-100'>{`${comment.postedBy.userName}`}</p>
        <p className='text-orange-50'>{comment.comment}</p>
      </div>
    </div>
  ))
) : (
  <div className=" "><img width={130} height={130} src='https://cdn.sanity.io/images/ziomnka5/production/6c33d60ed8cb9cbed5e5d2285ba99cf3d4279eed-500x500.png'className='ml-auto mr-auto'/></div>
)}

      </div>
      <h2 className='text-center font-bold text-3xl mt-6 text-lime-950 mb-4'>More Like This</h2>
      {posts?.length > 0 ? (
        <>

          <MasonryLayout posts={posts} />
        </>
      ) : (
        <img src='https://cdn.sanity.io/images/ziomnka5/production/4dcf21677bf2755418f0d08ba02e994e2c2a4c93-500x500.png' className='mr-auto ml-auto' />
      )}
    </>
  );
};

export default PostDetail;
