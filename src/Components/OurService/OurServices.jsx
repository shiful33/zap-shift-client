
import React from "react";
import { ourServiceData, icons } from "../../ServiceData/UurServiceData";


const OurServices = () => {
  return (
    <section className="py-16 bg-secondary rounded-4xl shadow-2xl mb-[100px]">
      <div className="container px-4 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mt-20 mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Our Services
          </h2>
          <p className="max-w-3xl mx-auto text-gray-100">
            Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. 
            From personal packages to business shipments — we deliver on time, every time.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {ourServiceData.map((item, index) => {
            const IconComponent = icons[item.iconKey];

            if (!IconComponent) return null;

            return (
              <div
                key={index}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center border border-gray-100 hover:border-[#CAEB66] hover:bg-[#CAEB66]"
              >
                {/* Icon */}
                <div className="flex justify-center mb-5">
                  <div className="p-4 bg-[#CAEB66]/10 rounded-full transition-colors">
                    <IconComponent className="w-12 h-12 text-[#CAEB66] group-hover:text-white " />
                  </div>
                </div>

                {/* Title */}
                <h3 className="mb-3 text-xl font-bold text-gray-800">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-gray-600">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurServices;