import React from 'react';
import BestSellers from '../BestSellers/BestSellers';
import Banner from './Banner';
import './Home.css'
import VehicleSearch from './VehicleSearch';

const Home = () => {
    return (
        <div className='home-main'>
          <Banner></Banner>
          <VehicleSearch></VehicleSearch>
          <BestSellers></BestSellers>
        </div>
    );
};

export default Home;