import React from 'react';
import Slider from 'react-slick';
import './Brand.css'

const Brand = () => {
    const brands=[
        {
            "img":"https://i.ibb.co/0ZsyvL9/4.jpg"
        },
        {
            "img":"https://i.ibb.co/DGRdqLV/5.jpg"
        },
        {
            "img":"https://i.ibb.co/1ZqcNNX/6.jpg"
        },
        {
            "img":"https://i.ibb.co/cywXMdp/7.jpg"
        },
        {
            "img":"https://i.ibb.co/vsS604b/1.jpg"
        },
        {
            "img":"https://i.ibb.co/HP3PqDb/2.jpg"
        },
        {
            "img":"https://i.ibb.co/XypHyFC/3.jpg"
        },
        {
            "img":"https://i.ibb.co/XypHyFC/3.jpg"
        }
    ]

    const settings = {
        infinite: true,
        slidesToShow: 4,
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
        <div className='top-brand-main'>
        <p className='brand-single-title'>TOP QUALITY PARTNER</p>
       <h1 className='brand-entry-title'>SHOP BY BRANDS</h1>

       <Slider {...settings}>
                {
                    brands.map(brand =>

                        <div>
                            <div className="card w-mx-w bg-base-100">
                                <figure><img src={brand.img} alt="" className='w-100' /></figure>
                            </div>
                        </div>

                    )
                }
            </Slider>
   </div>
    );
};

export default Brand;