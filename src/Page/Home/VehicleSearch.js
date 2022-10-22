import React from 'react';
import './VehicleSearch.css'

const VehicleSearch = () => {
    return (
        <div className='Vehicle-Search-main'>
            <div className='Vehicle-Search-main-from'>
                <h1 className='vehicle-search-main-entry-title'>SELECT YOUR VEHICLE</h1>
                <p className='vehicle-search-main-single-title'>OVER 100,000 AUTOMOTIVE AND TRUCK PARTS</p>
                <div className='vehicle-form'>
                    <select>
                        <option value="Select Brand">Select Brand</option>
                        <option value="Audi">Audi</option>
                        <option value="Kia">Kia</option>
                        <option value="Mercedes">Mercedes</option>
                    </select>
                    <select>
                        <option value="Select Model">Select Model</option>
                        <option value="Audi">A4</option>
                        <option value="Kia">A6</option>
                        <option value="Mercedes">A8</option>
                    </select>
                    <select>
                        <option value="Select Year">Select Year</option>
                        <option value="Audi">2012</option>
                        <option value="Kia">2014</option>
                        <option value="Mercedes">2016</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default VehicleSearch;