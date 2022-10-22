import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom'
import auth from '../../firebase.init';
import './Navbar.css'

const Navbar = () => {
    const [user, loading, error] = useAuthState(auth);
    const logout = () => {
        signOut(auth);
        localStorage.removeItem('accessToken')
    };
    const menuItem = <>
        <li className='navbar-list'><Link to='/'>HOME</Link></li>
        <li className='navbar-list'><Link to='/shop'>SHOP</Link></li>
        <li className='navbar-list'><Link to='/features'>FEATURES</Link></li>
        <li className='navbar-list'><Link to='/collection'>COLLECTION</Link></li>
        <li className='navbar-list'><Link to='/blog'>BLOG</Link></li>
        <li className='navbar-list'><Link to='/aboutUs'>ABOUT US</Link></li>
        {
            user && <li className='navbar-list'><Link to='/dashboard'>DASHBOARD</Link></li>
        }
        {
            user ? <button onClick={logout} className='btn btn-primary text-white' type='button'>Sign Out</button> : <li><Link to='/login'>LOGIN</Link></li>
        }
    </>

    return (
        <div className="navbar bg-base-100 py-5 sticky top-0 z-50">
            <div className="navbar">
                <div className="dropdown">
                    <label tabIndex="0" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItem}
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl">MOTOR PARTS</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menuItem}
                </ul>
            </div>
            <div className="navbar-end">
                <label tabIndex="1" for="my-drawer-2" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
            </div>
        </div>
    );
};

export default Navbar;