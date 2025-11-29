import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { faqs } from "../../Components/OurService/FAQData";
import { BsArrowUpRightCircleFill } from "react-icons/bs";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mb-[100px]">
      <div>
        <div>
          <h2 className="text-center lg:text-[40px] font-extrabold mb-6">Frequently Asked Question</h2>
          <p className="max-w-2xl mx-auto mb-10 text-center text-gray-600">
            Enhance posture, mobility, and well-being effortlessly with Posture
            Pro. Achieve proper alignment, reduce pain, and strengthen your body
            with ease!
          </p>
        </div>

        <div className="space-y-4">
            {
                faqs.map((faq, index) => (
                    <div key={index} className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-md">
                        <button 
                          onClick={() => toggleFAQ(index)}
                          className="flex items-center justify-between w-full px-6 py-4 text-left transition-colors focus:outline-none hover:bg-gray-50"
                        >
                            <span className="pr-4 font-medium text-gray-800">{faq.question}</span>
                            <span className="text-[#CAEB66] transition-transform duration-300">{openIndex === index ? <FaChevronUp /> : <FaChevronDown /> }</span>
                        </button>

                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0" }`}>

                        <div className="px-6 pt-2 pb-4">
                            <p className="leading-relaxed text-gray-600">{faq.answer}</p>
                        </div>
                            
                        </div>
                    </div>
                ))}
        </div>

        <div className="flex items-center justify-center mt-12 text-center">
            <button className="inline-flex items-center gap-3 group bg-[#CAEB66] text-black font-semibold px-8 py-3 rounded-full hover:bg-[#b8d656] transition-all duration-300 shadow-md hover:shadow-lg text-[20px] font-bold">See More FAQ's</button>
            <BsArrowUpRightCircleFill className="text-[50px]"/>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
