import React from 'react';
import errorImg from '../../assets/errorImg.png';
import { Link } from 'react-router';

const ErrorPage = () => {
    return (
        <div className='w-10/12 mx-auto mt-[100px] lg:w-[50%] lg:h-[50%] bg-white'>
            <div className='grid items-center justify-center'>
                <img src={errorImg} alt="" className='flex justify-center mx-auto w-[120px]' />
                <h2 className='text-[56px] text-red-500 font-extrabold text-center my-8'>Error 404</h2>
                <Link to="/" className='bg-[#CAEB66] px-4 py-2 rounded-md font-semibold cursor-pointer text-center'>Go Home</Link>
            </div>
        </div>
    );
};

export default ErrorPage;