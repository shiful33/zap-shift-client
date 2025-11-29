import React from 'react';
import LiveTracking from '../../assets/live-tracking.png';
import SafeDelivery from '../../assets/safe-delivery.png';
import { LiveServiceData, images } from '../../ServiceData/LiveServiceData';





const LiveServices = () => {
    return (
        <div>
            <section className='py-16'>
                <div className='mx-auto'>
                    <div className='grid grid-cols-1 gap-8'>
                    {
                        LiveServiceData.map((item, index) => {
                            const ImageComponent = images[item.imageKey];

                            if (!ImageComponent) return null;

                            return (
                                <div key={index} 
                                className='group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 py-12 px-20 text-center border border-pink-100 hover:border-[#CAEB66] '
                                >
                                   <div className='items-center gap-24 lg:flex'>
                                    <div className='flex shrink-0 '>
                                    <img src={ImageComponent} alt={item.title} 
                                    className='object-contain'
                                    />
                                   </div>
                                    <div className='grid mt-6 lg:mt-0 text-start'>
                                    <h3 className='text-[24px] font-extrabold'>{item.title}</h3>
                                    <p>{item.description}</p>
                                    </div>
                                   </div>
                                </div>
                            );
                        })}
                </div>
                </div>
            </section>
        </div>
    );
};

export default LiveServices;