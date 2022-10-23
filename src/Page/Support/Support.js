import React from 'react';
import './Support.css'
import { AiFillCar,AiTwotoneSafetyCertificate } from 'react-icons/ai';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { BiSupport } from 'react-icons/bi';

const Support = () => {
    return (
        <div className='bg-base-200 py-10 mt-20'>
            <div className='support-main'>
                <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>
                    <div className='icon-section-1'>
                        <div>
                            <h2><AiFillCar /></h2>
                        </div>
                        <div>
                        <h4>FREE SHIPPING</h4>
                        <p>On all orders over $99.00</p>
                        </div>
                    </div>
                    <div className='icon-section-2'>
                        <div>
                            <h2><FaRegMoneyBillAlt /></h2>
                        </div>
                       <div>
                       <h4>MONEY GUARANTEE</h4>
                        <p>7 days money back guarantee</p>
                       </div>
                    </div>
                    <div className='icon-section-3'>
                        <div>
                            <h2><AiTwotoneSafetyCertificate /></h2>
                        </div>
                       <div>
                       <h4>SAFE SHOPPING</h4>
                        <p>Safe shopping guarantee</p>
                       </div>
                    </div>
                    <div className='icon-section-4'>
                        <div>
                            <h2><BiSupport /></h2>
                        </div>
                       <div>
                       <h4>SAFE SHOPPING</h4>
                        <p>Safe shopping guarantee</p>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Support;