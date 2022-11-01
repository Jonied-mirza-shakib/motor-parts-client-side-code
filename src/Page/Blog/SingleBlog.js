import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SingleBlog = () => {
    const [blog, setBlog] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        fetch(`https://motor-parts-server-side-code-production.up.railway.app/blog/${id}`)
            .then(res => res.json())
            .then(data => setBlog(data))
    }, [id])
    return (
        <div style={{width:"60%",margin:"auto",marginBottom:"100px"}}>
            <div className="card card-compact w-mx-w bg-base-100 shadow-xl mt-10">
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