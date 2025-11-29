import React from 'react';
import logo from '../../assets/logo.png';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <div className='flex items-end mb-4 ml-4'>
            <img src={logo} className='w-6 lg:w-12' alt="" />
            <Link to="/" className='text-[20px] lg:text-[32px] font-semibold lg:font-extrabold cursor-pointer ml-[-25px]'>Zap Service</Link>
        </div>
    );
};

export default Logo;