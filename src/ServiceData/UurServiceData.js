import { AiOutlineSolution } from "react-icons/ai";
import { BsCashCoin } from "react-icons/bs";
import { CiDeliveryTruck } from "react-icons/ci";
import { MdDeliveryDining, MdHomeRepairService } from "react-icons/md";
import { TbTruckReturn } from "react-icons/tb";

export const icons = {
  express: MdDeliveryDining,        
  standard: CiDeliveryTruck,        
  fulfillment: AiOutlineSolution,   
  cash: BsCashCoin,                
  corporate: MdHomeRepairService,   
  return: TbTruckReturn,            
};

export const ourServiceData = [
  {
    iconKey: "express",
    title: "Express Delivery",
    description:
      "Get your parcels delivered within 4–6 hours in Dhaka. Perfect for urgent shipments.",
  },
  {
    iconKey: "standard",
    title: "Standard Delivery",
    description:
      "Reliable delivery within 24–72 hours across Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi.",
  },
  {
    iconKey: "fulfillment",
    title: "E-commerce Fulfillment",
    description:
      "Complete logistics support: inventory management, order processing, packaging, and after-sales service.",
  },
  {
    iconKey: "cash",
    title: "Cash on Delivery (COD)",
    description:
      "100% secure cash collection on delivery anywhere in Bangladesh. Trusted by thousands of merchants.",
  },
  {
    iconKey: "corporate",
    title: "Corporate & Contract Logistics",
    description:
      "Tailored solutions for businesses: warehouse management, bulk shipping, and dedicated support.",
  },
  {
    iconKey: "return",
    title: "Parcel Return & Exchange",
    description:
      "Hassle-free returns for online customers. We handle reverse logistics with care.",
  },
];