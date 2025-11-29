import React from "react";
import topMerchant from "../../assets/be-a-merchant-bg.png";
import locationMerchant from "../../assets/location-merchant.png";

const MerchantBanner = () => {
  return (
    <div>
      <section className="shadow-xl rounded-4xl bg-secondary mb-[100px] my-20 lg:min-h-[440px]">
        <img src={topMerchant} alt="" className="absolute mx-auto" />
        <div className="relative justify-center p-8 lg:flex lg:px-30">
          <div className="lg:mt-20">
            <div className="lg:w-[60%]">
              <h1 className="text-[28px] font-extrabold text-white mb-6">
                Merchant and Customer Satisfaction is Our First Priority
              </h1>
              <p className="mb-8 text-gray-300">
                We offer the lowest delivery charge with the highest value along
                with 100% safety of your product. Pathao courier delivers your
                parcels in every corner of Bangladesh right on time.
              </p>
            </div>
          </div>
          <div>
            <img src={locationMerchant} alt="" className="mt-20" />
          </div>
        </div>
        <div className="ml-10 lg:ml-30 lg:mt-[-30px] lg:flex gap-6 pb-6">
          <button className="rounded-full px-6 py-2 bg-[#CAEB66] hover:border-1 text-[20px] hover:text-[#CAEB66] font-bold cursor-pointer hover:bg-transparent hover:border-[#CAEB66] mb-4 lg:mb-0">
            Become a Merchant
          </button>
          <button className="rounded-full px-6 py-2 bg-transparent border-1 border-[#CAEB66] text-[20px] text-[#CAEB66] font-bold cursor-pointer hover:bg-[#CAEB66] hover:text-secondary">
            Earn with Zap Courier Service
          </button>
        </div>
      </section>
    </div>
  );
};

export default MerchantBanner;
