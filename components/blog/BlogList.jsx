import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import BlogData from "./blogData.json";
const blogData=BlogData.blogData;
const commentsData = {
  1: [
    { id: 1, text: "This is very insightful!", likes: 5, dislikes: 0 },
    { id: 2, text: "I totally agree!", likes: 3, dislikes: 1 }
  ],
  2: [
    { id: 3, text: "Great tips, thanks!", likes: 7, dislikes: 2 }
  ],
  3:[
    { "id": 5, "text": "Reading has helped my child immensely!", "likes": 4, "dislikes": 0 },
    { "id": 6, "text": "I will start making this a daily habit.", "likes": 6, "dislikes": 1 }
  ],
  4:[
      { "id": 7, "text": "I love this idea of praising effort!", "likes": 3, "dislikes": 1 },
      { "id": 8, "text": "A great way to build confidence in kids.", "likes": 5, "dislikes": 0 }
  ],
  5:[
    { "id": 9, "text": "Setting a routine has worked wonders for us.", "likes": 4, "dislikes": 0 },
    { "id": 10, "text": "I struggle to get my kid to do homework, will try these tips.", "likes": 3, "dislikes": 1 }
  ],
};

const Comment = ({ comment }) => {
  return (
    <div className="p-2 border-b text-sm">
      <p>{comment.text}</p>
      <div className="flex gap-2 mt-1 text-gray-600">
        <button className="flex items-center gap-1"> <FaHeart className="text-red-500" /> {comment.likes}</button>
        <button className="flex items-center gap-1"> <FaRegHeart /> {comment.dislikes}</button>
      </div>
    </div>
  );
};

const CommentSection = ({ blogId }) => {
  const [comments, setComments] = useState(commentsData[blogId] || []);
  return (
    <div className="mt-2 p-2 border-t bg-gray-100 rounded-lg">
      <h4 className="text-md font-semibold">Comments:</h4>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

const Blog = ({ blog }) => {
  const [showComments, setShowComments] = useState(false);
  return (
    <div className="border rounded-lg p-4 mb-4 shadow-md bg-white">
      <h3 className="text-lg font-semibold">{blog.title}</h3>
      <p className="text-gray-600 text-sm">{blog.description}</p>
      <div className="flex gap-4 mt-2 text-gray-600">
        <button className="flex items-center gap-1"> <FaHeart className="text-red-500" /> {blog.likes}</button>
        <button className="flex items-center gap-1"> <FaRegHeart /> {blog.dislikes}</button>
      </div>
      <button className="flex items-center gap-1 mt-2 text-blue-600" onClick={() => setShowComments(!showComments)}>
        {showComments ? <IoIosArrowUp /> : <IoIosArrowDown />} View Comments
      </button>
      {showComments && <CommentSection blogId={blog.id} />}
    </div>
  );
};

const BlogList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5;
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogData.slice(indexOfFirstBlog, indexOfLastBlog);
  
  return (
    <div className="mt-2 rounded-md p-4 w-11/12 mx-auto border-2 border-indigo-600 bg-indigo-100">
      <h2 className="text-xl font-bold mb-4">Find Blogs Parental contribution to children's education..</h2>
      {currentBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
      <div className="flex justify-between mt-4">
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50">Previous</button>
        <span className="text-gray-700">Page {currentPage} of {Math.ceil(blogData.length / blogsPerPage)}</span>
        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(blogData.length / blogsPerPage)))} disabled={currentPage === Math.ceil(blogData.length / blogsPerPage)} className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50">Next</button>
      </div>
    </div>
  );
};

export default BlogList;