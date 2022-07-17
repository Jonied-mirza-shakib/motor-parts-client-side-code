import React from 'react';

const Blog = () => {
    return (
        <div className='mb-20'>
            <h1 className='text-center text-5xl font-bold capitalize text-accent-focus my-10'>Our Blog</h1>
            <div className="divider w-80 mx-auto"></div>
            <div className='grid md:grid-cols-1 lg:grid-cols-2 gap-10 mb-10'>
                <div className="card max-w-screen-lg bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h4 className='card-title text-fuchsia-900'>1. How will you improve the performance of a React Application?</h4>
                        <p className='font-bold'>Optimizing performance in a React application</p>
                        <p>
                            1.Keeping component state local where necessary.
                            <br />
                            2.Memoizing React components to prevent unnecessary re-renders.
                            <br />
                            3.Code-splitting in React using dynamic import()
                            <br />
                            4.Windowing or list virtualization in React.
                            <br />
                            5.Lazy loading images in React.
                        </p>
                    </div>
                </div>
                <div className="card max-w-screen-lg bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h4 className='card-title text-fuchsia-900'>2. What are the different ways to manage a state in a React application?</h4>
                        <p className='font-bold'>There are four main types of state you need to properly manage in your React apps:</p>
                        <p>
                            1.Local state.
                            <br />
                            2.Global state.
                            <br />
                            3.Server state.
                            <br />
                            4.URL state.
                        </p>
                    </div>
                </div>
            </div>
            <div className='grid md:grid-cols-1 lg:grid-cols-2 gap-10'>
                <div className="card max-w-screen-lg bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h4 className='card-title text-fuchsia-900'>3.How does prototypical inheritance work?</h4>
                        <p>The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object.</p>
                    </div>
                </div>
                <div className="card max-w-screen-lg bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h4 className='card-title text-fuchsia-900'>4.Why you do not set the state directly in React. For example, if you have const [products, setProducts] = useState([]). Why you do not set products = [...] instead, you use the setProducts?</h4>
                        <p>One should never update the state directly because of the following reasons: If you update it directly, calling the setState() afterward may just replace the update you made.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;