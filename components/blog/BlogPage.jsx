import React, { useEffect, useState } from 'react'
import VideoCard from './VideoCard';
import BlogList from './BlogList';
const BlogPage = () => {
const [showBlog,setShowBlog]=useState(true);
  const [youtubeLinks, setYoutubeLinks] = useState([
    "https://www.youtube.com/embed/oDKV3s3k6b4?si=2qjuzYYvuHWPbaND", 
    "https://www.youtube.com/embed/N3WJwOhnqzM?si=IBMhm9ly1bl7OybV", 
    "https://www.youtube.com/embed/kJGpKKvlqPs?si=NgvrwU4_TIacmZhN", 
    "https://www.youtube.com/embed/BEC_rHlvTdA?si=H0sjS9FXXCb_mtoy", 
    "https://www.youtube.com/embed/1X2b-mmj2tk?si=kM421mL1Mo4JntMB",  
  ]);
const blogHandle=()=>{
  setShowBlog(true);
}
const videoHandle=()=>{
  setShowBlog(false);
}


  const animationattribute=[
    {m1:"fade-up-right"},
  ]
  return (
    <div className='BlogPage'>
      <div className="w-11/12 mx-auto flex space-x-4 p-2 bg-gray-100 rounded-lg">
        <button
          onClick={blogHandle}
          className={`min-w-[150px] px-4 py-2 rounded-md font-semibold transition-all ${
            showBlog ? "bg-indigo-700 text-white shadow-md" : "bg-indigo-300 text-indigo-900"
          }`}
        >
          Blog
        </button>
        <button
          onClick={videoHandle}
          className={`min-w-[150px] px-4 py-2 rounded-md font-semibold transition-all ${
            !showBlog ? "bg-indigo-700 text-white shadow-md" : "bg-indigo-300 text-indigo-900"
          }`}
        >
          Video
        </button>
      </div>
        <div className='content'>
        { !showBlog &&
              <div className='w-11/12 mx-auto mt-2 border-2 border-indigo-600  bg-indigo-100 rounded-md'>
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                  {youtubeLinks.map((link, index) => (
                    <VideoCard key={index} data={link} />
                  ))}
                </div>
              </div>}
      { showBlog && 
         (
          <BlogList/>
         )
      }

      </div>
    </div>
  )
}

export default BlogPage;