import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../Pages/Shared/Footer';
import NavBar from '../Pages/Shared/NavBar';
import ScrollToTopButton from '../Components/ScrollToTopButton';

const RootLayout = () => {
    return (
        <div>
            <div className='w-11/12 mx-auto'>
                <NavBar />
            </div>
            <main>
                <Outlet />
            </main>
            <div>
                <ScrollToTopButton />
                <Footer />
            </div>
        </div>
    );
};

export default RootLayout;