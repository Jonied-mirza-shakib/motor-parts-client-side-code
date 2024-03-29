import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Blog.css'

const Blog = () => {
    const [blog, setBlog] = useState([]);
    const navigate=useNavigate();
    useEffect(() => {
        fetch('https://motor-parts-server-side-code-production.up.railway.app/blog')
            .then(res => res.json())
            .then(data => setBlog(data))
    }, [])
    const singleBlog=id=>{
        navigate(`/singleBlog/${id}`)
    }
    return (
        <div className='blog-main'>
            <p className='blog-single-title'>OUR RECENT POSTS</p>
            <h1 className='blog-entry-title'>LATEST BLOG</h1>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                {
                    blog.map(blogs =>
                        <div key={blogs._id} className="card card-compact w-mx-w bg-base-100 shadow-xl">
                            <figure><img src={blogs.img} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">Title: {blogs.blogTitle}</h2>
                                <div className="card-actions justify-end">
                                    <button onClick={()=>singleBlog(blogs._id)} className="btn btn-outline btn-primary">READ MORE</button>
                                </div>
                            </div>
                        </div>

                    )
                }
            </div>
        </div>
    );
};

export default Blog;