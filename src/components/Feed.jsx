// Feed.js
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { client } from '../client';
import { MasonryLayout, Spinner, Post } from './index';  // Make sure to import the Post component
import { feedQuery, searchQuery } from '../utils/data';

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState(null);
  const { categoryId } = useParams();
  const location = useLocation();

  useEffect(() => {
    setLoading(true);

    if (categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPosts(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPosts(data);
        setLoading(false);
      });
    }
  }, [location.pathname]); 

  if (loading) return <Spinner message="Lookin For New Ideas For You To Discover " />;

  if(!posts?.length) return <div className='flex justify-center items-center flex-wrap xl:ml-50'>
  <img src='https://cdn.sanity.io/images/ziomnka5/production/4dcf21677bf2755418f0d08ba02e994e2c2a4c93-500x500.png' className="flex justify-center items-center mt-20"alt="Nothing to See" />
  
</div>

  
  return (
    <div className=''>
      {posts && <MasonryLayout posts={posts} />}
    </div>
  );
};

export default Feed;
