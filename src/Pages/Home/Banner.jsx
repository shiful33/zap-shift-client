import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from '../../assets/banner/banner1.png';
import banner2 from '../../assets/banner/banner2.png';
import banner3 from '../../assets/banner/banner3.png';
import { BsArrowUpRightCircleFill } from 'react-icons/bs';


const Banner = () => {
    return (
        <div className='mb-[100px]'>
             <Carousel autoPlay={true} infiniteLoop={true}>
                <div className='relative'>
                    <img src={banner1} />
                    <div className='flex items-center absolute bottom-4 lg:bottom-25 left-4 lg:left-25'>
                        <h3 className='px-3 lg:px-5 py-1 lg:py-2 bg-[#CAEB66] rounded-full text-[13px] lg:text-[20px] font-bold'>Track Your Parcel</h3>
                        <BsArrowUpRightCircleFill  className="lg:text-[35px]"/>
                        <button className='btn px-2 lg:px-4 py-0 lg:py-2 btn-outline rounded ml-2 lg:ml-4 bg-transparent border-gray-300'>Be A Rider</button>
                    </div>
                </div>
                <div>
                    <img src={banner2} />
                    <div className='flex items-center absolute bottom-4 lg:bottom-25 left-4 lg:left-25'>
                        <h3 className='px-3 lg:px-5 py-1 lg:py-2 bg-[#CAEB66] rounded-full text-[13px] lg:text-[20px] font-bold'>Track Your Parcel</h3>
                        <BsArrowUpRightCircleFill  className="lg:text-[35px]"/>
                        <button className='btn px-2 lg:px-4 py-0 lg:py-2 btn-outline rounded ml-2 lg:ml-4 bg-transparent border-gray-300'>Be A Rider</button>
                    </div>
                </div>
                <div>
                    <img src={banner3} />
                    <div className='flex items-center absolute bottom-4 lg:bottom-25 left-4 lg:left-25'>
                        <h3 className='px-3 lg:px-5 py-1 lg:py-2 bg-[#CAEB66] rounded-full text-[13px] lg:text-[20px] font-bold'>Track Your Parcel</h3>
                        <BsArrowUpRightCircleFill  className="lg:text-[35px]"/>
                        <button className='btn px-2 lg:px-4 py-0 lg:py-2 btn-outline rounded ml-2 lg:ml-4 bg-transparent border-gray-300'>Be A Rider</button>
                    </div>
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;