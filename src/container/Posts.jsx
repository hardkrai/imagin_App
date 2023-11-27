import React, {useState} from 'react'
import { Route, Routes } from 'react-router-dom'
import { Navbar, Feed, CreatePost, PostDetail, Search } from '../components'

const Posts = ({user }) => {

  const [searchTerm, setSearchTerm]= useState('')
  return (
    <div className=' '>
      <div className="bg-orange-50 -mr-3 xxs:mr-0 ml-1 md:ml-0 lg:ml-0 xl:ml-0 sticky-top-0 ">

        <Navbar user={user}  searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      </div>
      <div className="h-full mdd:-ml-3 mr-3 mds:-ml-8 mds:mr-1  xxs:ml-0 smaller:-ml-4 small:-ml-5  -ml-3">
        <Routes >

          <Route path="/"  element={<Feed/>}/>
          <Route path="/category/:categoryId" element={<Feed/>}/>
          <Route path="/post-detail/:postId" element={<PostDetail user={user}/>}/>
          <Route path="/create-post"  element={<CreatePost user={user}/>}/>
          <Route path="/search" element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>}/>

        </Routes>
      </div>
      
      </div>
  )
}

export default Posts