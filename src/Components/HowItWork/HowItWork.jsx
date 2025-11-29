import React from 'react';
import { howItWorksData, icons } from '../../WorksData/HowItWorksData';


const HowItWork = () => {

    return (
        <div>
            <section>
                <div className='mb-[100px]'>
                    <h2 className='text-[32px] font-extrabold mb-8'>How It Work</h2>
                <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {
                       howItWorksData.map((item, index) => {
                        const IconComponent = icons[item.iconKey];

                       return (
                        <div key={index} 
                        className='group p-10 bg-white rounded-2xl text-start shadow-sm hover:shadow-2xl transition-all duration-300 border border-pink-100 hover:border-[#CAEB66] hover:bg-[#CAEB66]'
                        >
                          <div className=''><IconComponent  className='w-16 h-16 text-[#CAEB66] group-hover:text-white mb-5'/></div>
                          <h2 className='text-[20px] font-bold mb-4'>{item.title}</h2>
                          <p>{item.description}</p>
                       </div>
                       );

                       })}
                </div>
                </div>
            </section>
        </div>
    );
};

export default HowItWork;