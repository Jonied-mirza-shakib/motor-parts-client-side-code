import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import auth from '../../firebase.init';
import useAdmin from '../../hooks/useAdmin';

const Dashboard = () => {
    const [user, loading, error] = useAuthState(auth);
    const [admin]=useAdmin(user)
    return (
        <div class="drawer drawer-mobile mt-10 mb-20">
            <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content">
                <h1 className='text-4xl text-purple-900 text-center'>Welcome to Your Dashboard</h1>
                <Outlet></Outlet>
            </div>
            <div class="drawer-side">
                <label for="my-drawer-2" class="drawer-overlay"></label>
                <ul class="menu p-4 overflow-y-auto w-30 bg-base-100 text-base-content">
                    {!admin&&<li className='text-accent font-bold'><Link to='/dashboard'>My Review</Link></li>}
                    <li className='text-accent font-bold'><Link to='/dashboard/order'>My Orders</Link></li>
                    {!admin&&<li className='text-accent font-bold'><Link to='/dashboard/profile'>My Profile</Link></li>}
                   {!admin&& <li className='text-accent font-bold'><Link to='/dashboard/addProfileInformation'>Add Profile Information</Link></li>}
                    {admin&&<li className='text-accent font-bold'><Link to='/dashboard/bestSeller'>Add Best Seller</Link></li>}
                    {admin&&<li className='text-accent font-bold'><Link to='/dashboard/addBlog'>Add Blog</Link></li>}
                    {admin&&<li className='text-accent font-bold'><Link to='/dashboard/allUser'>All user</Link></li>}
                    {admin&&<li className='text-accent font-bold'><Link to='/dashboard/manageParts'>Manage Parts</Link></li>}
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;