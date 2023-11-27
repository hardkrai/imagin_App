import React from 'react'
import Masonry from 'react-masonry-css'
import Post from './Post'

const breakpointObj = {
  default: 4,
  3760:7,
  3000:6,
  2000:5,
  1200:3,
  1000:2,
  500:2,
  460:1,
  452:2,
  454:2,
  400:1,
  350: 2,
  390:2,
  394:2,
}
for (let i = 300; i <= 500; i++) {
  breakpointObj[i] = 2;
}
const MasonryLayout = ({posts}) => {
  return (
    <Masonry
    
    className='flex  w-full xxs:ml-2 sss:ml-0 s:ml-1  md:ml-9   md:m-auto lg:m-auto lg:ml-9 xl:ml-9 mds:ml-11 mdd:ml-10 xl:m-auto sm:w-auto md:w-auto lg:w-auto xl:w-auto  ' breakpointCols={breakpointObj}

    >
      {posts?.map((post)=><Post key={post._id} post={post} className="mr-5"/>)}


    </Masonry>
  )
}

export default MasonryLayout