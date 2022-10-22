import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import './NewArrivals.css'

const NewArrivals = () => {
    const [parts, setParts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/bestSeller')
            .then(res => res.json())
            .then(data => setParts(data))
    }, [])

    const settings = {
        infinite: true,
        slidesToShow: 3,
        lazyLoad: true,
        dots: true,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ],
    };



    return (
        <div className='new-arrival-main'>
            <p className='new-arrival-single-title'>TOP SALE ON THIS MONTH</p>
            <h1 className='new-arrival-entry-title'>NEW ARRIVALS</h1>
            <Slider {...settings}>
                {
                    parts.map(part =>

                        <div style={{margin:"50px"}}>
                            <div key={part._id} className="card w-mx-w bg-base-100">
                                <figure><img src={part.img} alt="" className='w-100' /></figure>
                                <div className="card-body">
                                    <h1 className='new-arrival-title'>NAME: {part.name}</h1>
                                    <p className='new-arrival-price'>PRICE: {part.price}</p>
                                    <button type="button" className='btn btn-outline btn-primary'>ADD TO CART</button>
                                </div>
                            </div>
                        </div>

                    )
                }
            </Slider>

            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>


            </div>
        </div>
    );
};

export default NewArrivals;