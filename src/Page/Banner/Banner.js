import React from 'react';
import GoogleFontLoader from 'react-google-font-loader';
import bannerImg from '../../images/banner.webp'

const Banner = () => {
    <GoogleFontLoader
        fonts={[
            {
                font: 'Roboto',
                weights: [400, '400i'],
            },
            {
                font: 'Roboto Mono',
                weights: [400, 700],
            },
        ]}
        subsets={['cyrillic-ext', 'greek']}
    />
    return (
        <div className="hero min-h-screen mb-20">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img style={{ width: '50%' }} src={bannerImg} />
                <div>
                    <h1 style={{ fontFamily: 'Roboto Mono, monospaced' }} className="text-4xl font-bold capitalize text-emerald-900">Well Come to Our Motor Parts manufacturer </h1>
                    <p style={{ fontFamily: 'Roboto Mono, monospaced' }} className="py-6 text-xl">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <button className="btn btn-primary uppercase text-white">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;