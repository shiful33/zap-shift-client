import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FourSquare } from "react-loading-indicators";

const Payment = () => {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: parcel } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  const handlePayment = async () => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail || parcel.senderEmail,
      parcelName: parcel.parcelName || "Parcel Delivery",
    };
    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);

    console.log(res.data);
    window.location.href = res.data.url;
  };

  if (isLoading) {
    return (
      <div>
        <FourSquare color="#CAEB66" size="medium" text="" textColor="" />
      </div>
    );
  }

  if (!parcel) {
    // You might show an error message or just a fallback component here
    return <div>Parcel data not found.</div>;
  }

  return (
    <div className="p-6">
      <h2>
        Please Pay ${parcel.cost} for: {parcel.parcelName}
      </h2>
      <button
        onClick={handlePayment}
        className="mt-1 text-white btn btn-primary btn-sm"
      >
        Pay
      </button>
    </div>
  );
};

export default Payment;
