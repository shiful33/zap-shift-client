import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  // const [transactionId, setTransactionId] = useState();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  const [paymentInfo, setPaymentInfo] = useState({
    transactionId: "",
    trackingId: "",
    loading: true,
    error: null,
  });
  // console.log(sessionId)

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log("API Response:", res.data);

          setPaymentInfo({
            transactionId:
              res.data.transactionId || res.data.paymentIntentId || "N/A",
            trackingId: res.data.parcelId || res.data.trackingId || "N/A",
            loading: false,
            error: null,
          });
        });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div className="p-6">
      <h2 className="text-3xl">Payment Successful</h2>
      <p>Your TransactionId: {paymentInfo.transactionId || "Not found"}</p>
      <p>Your Parcel Tracking id: {paymentInfo.trackingId || "Not found"}</p>
      <div className="mt-6 text-start">
        <button
          onClick={() => (window.location.href = "/dashboard/my-parcels")}
          className="px-6 py-3 text-white btn bg-primary"
        >
          Go to My Parcels
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
