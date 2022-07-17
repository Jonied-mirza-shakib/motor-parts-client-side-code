import React from 'react';
import GoogleFontLoader from 'react-google-font-loader';
import { FaFlagCheckered } from 'react-icons/fa';
import { RiComputerFill } from 'react-icons/ri';
import { ImManWoman } from 'react-icons/im';
import { AiFillLike } from 'react-icons/ai';
import CountUp from 'react-countup';

const BusinessSummary = () => {
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
        <div>
            <h1 style={{ fontFamily: 'Roboto Mono, monospaced' }} className='capitalize text-3xl text-center font-bold mt-10 text-indigo-900'>our business trust us</h1>
            <p className='text-center text-xl mt-5 text-indigo-900 capitalize'>try to understand user expectation</p>
            <div className="divider">OR</div>
            <div className='grid grid-cols-4 gap-5'>
                <div>
                    <h1 className='text-4xl mb-5 text-indigo-700'><FaFlagCheckered /></h1>
                    <CountUp end={500} duration={5} className='text-4xl text-accent-focus' />
                    <h4 className='font-bold text-accent'>Countries</h4>
                </div>
                <div>
                    <h1 className='text-4xl mb-5 text-indigo-700'><RiComputerFill /></h1>
                    <CountUp end={1000} duration={5} className='text-4xl text-accent-focus' /><span className='text-3xl font-bold text-accent'>+</span>
                    <h4 className='font-bold text-accent'>Complete Projects</h4>
                </div>
                <div>
                    <h1 className='text-4xl mb-5 text-indigo-700'><ImManWoman /></h1>
                    <CountUp end={900} duration={5} className='text-4xl text-accent-focus' /><span className='text-3xl font-bold text-accent'>+</span>
                    <h4 className='font-bold text-accent'>Happy Client</h4>
                </div>
                <div>
                    <h1 className='text-4xl mb-5 text-indigo-700'><AiFillLike /></h1>
                    <CountUp end={800} duration={5} className='text-4xl text-accent-focus' /><span className='text-3xl font-bold text-accent'>+</span>
                    <h4 className='font-bold text-accent'>Feedbacks</h4>
                </div>
            </div>
        </div>
    );
};

export default BusinessSummary;