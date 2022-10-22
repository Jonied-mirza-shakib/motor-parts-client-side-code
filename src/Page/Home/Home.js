import React from 'react';
import BestSellers from '../BestSellers/BestSellers';
import NewArrivals from '../NewArrivals/NewArrivals';
import Banner from './Banner';
import './Home.css'
import VehicleSearch from './VehicleSearch';

const Home = () => {
    return (
        <div className='home-main'>
          <Banner></Banner>
          <VehicleSearch></VehicleSearch>
          <BestSellers></BestSellers>
          <NewArrivals></NewArrivals>
        </div>
    );
};

export default Home;