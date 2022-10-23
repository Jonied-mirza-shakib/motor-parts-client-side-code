import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SingleBlog = () => {
    const [blog, setBlog] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        fetch(`http://localhost:5000/blog/${id}`)
            .then(res => res.json())
            .then(data => setBlog(data))
    }, [id])
    return (
        <div className='blog-main'>
            <p className='blog-single-title'>OUR RECENT POSTS</p>
            <h1 className='blog-entry-title'>LATEST BLOG</h1>
            <div className="card card-compact w-mx-w bg-base-100 shadow-xl">
                <figure><img src={blog.img} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">Title: {blog.blogTitle}</h2>
                    <p>Description: {blog.description}</p>
                </div>
            </div>
        </div>
    );
};

export default SingleBlog;