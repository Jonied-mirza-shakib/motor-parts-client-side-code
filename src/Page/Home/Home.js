import React from 'react';
import BestSellers from '../BestSellers/BestSellers';
import Brand from '../Brand/Brand';
import NewArrivals from '../NewArrivals/NewArrivals';
import TopCategories from '../TopCategories/TopCategories';
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
          <TopCategories></TopCategories>
          <Brand></Brand>
        </div>
    );
};

export default Home;