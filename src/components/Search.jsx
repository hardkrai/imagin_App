import React from 'react'
import { useState, useEffect } from 'react'
import MasonryLayout from './MasonryLayout'
import { client } from '../client'
import { feedQuery, searchQuery } from '../utils/data'
import Spinner from './Spinner'
const Search = ({searchTerm}) => {
  const [posts, setPosts] = useState(null)
  const [loading, setLoading] = useState(false)


  useEffect(()=>{
    if(searchTerm){
      setLoading(true)
      const query = searchQuery(searchTerm.toLowerCase())

      client.fetch(query)
      .then((data)=>{
        setPosts(data);
        setLoading(false)
      })
      
    }else{
      client.fetch(feedQuery)
      .then((data)=>{
        setPosts(data);
        setLoading(false)
      })
    }
  }, [searchTerm])

  return (
    <div>
      {loading && <Spinner message = " Searcing For Posts..."/>}
      {posts?.length !== 0 && <MasonryLayout posts={posts}/>}
      {posts?.length ===0 && searchTerm !== '' && !loading &&(
        <div className="mt-10 text-center text-xl text-gray-400 italic"> <img src='https://cdn.sanity.io/images/ziomnka5/production/b5d456d4345fce074cd9a73d87cb035df490976c-500x500.png' className='ml-auto mr-auto'/></div>
      )}

    </div>
  )
}

export default Search