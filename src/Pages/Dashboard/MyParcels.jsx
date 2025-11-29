import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { RiEditLine } from "react-icons/ri";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
      
    },
    enabled: !!user?.email,
  });

  const handleParcelDelete = (id) => {
    axiosSecure.delete(`/parcels/${id}`).then((res) => {
      console.log(res.data);

      if (res.data.deletedCount) {
        refetch();
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Deleted!",
              text: "Your parcels has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handlePayment = async (parcel) => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
      trackingId: parcel.trackingId
    }
    const res = await axiosSecure.post('/payment-checkout-session', paymentInfo);
    console.log(res.data.url);
    window.location.assign(res.data.url);
  }

  return (
    <div>
      <h2>All of my parcels : {parcels.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Cost</th>
              <th>Payment</th>
              {/* <th>Transaction Id</th> */}
              <th>Tracking Id</th>
              <th>Delivery Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost}</td>
                <td>
                    {
                        parcel.paymentStatus === 'paid' ? <span className="text-green-400">Paid</span> : 
                        <Link to={`/dashboard/payment/${parcel._id}`}>
                        <button
                        onClick={() => handlePayment(parcel)}
                        className="mt-1 text-white btn btn-primary">Pay</button>
                        </Link>
                    }
                </td>
                {/* <td>{parcel.transactionId}</td> */}
                <td>
                  <Link to={`/parcel-track/${parcel.trackingId}`}>
                  {parcel.trackingId}
                  </Link>
                </td>
                <td>{parcel.deliveryStatus}</td>
                <td>
                  <button className="btn btn-sm btn-square hover:bg-primary hover:text-white">
                    <FaMagnifyingGlass />
                  </button>

                  <button className="mx-2 btn btn-square hover:bg-primary hover:text-white">
                    <RiEditLine />
                  </button>

                  <button
                    onClick={() => handleParcelDelete(parcel._id)}
                    className="btn btn-square hover:bg-primary hover:text-white"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
