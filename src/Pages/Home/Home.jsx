import React from 'react';
import Banner from './Banner';
import HowItWork from '../../Components/HowItWork/HowItWork';
import OurServices from '../../Components/OurService/OurServices';
import Brand from './Brand';
import LiveServices from '../../Components/OurService/LiveServices';
import MerchantBanner from './MerchantBanner';
import Reviews from './Reviews';
import FAQSection from './FAQSection';

const reviewsPromise = fetch('/reviews.json')
.then(res => res.json());


const Home = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <Banner />
            <HowItWork />
            <OurServices />
            <Brand />
            <LiveServices />
            <MerchantBanner />
            <Reviews reviewsPromise={reviewsPromise}/>
            <FAQSection />
        </div>
    );
};

export default Home;