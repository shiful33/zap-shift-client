import React from "react";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AssignedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [] } = useQuery({
    queryKey: ["parcels", user.email, "driver_assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/riders?riderEmail=${user.email}&deliveryStatus=driver_assigned`
      );
      return res.data;
    },
  });

  const handleDeliveryStatusUpdate = (parcel, status) => {
    const statusInfo = { deliveryStatus: status, 
      riderId: parcel.riderId ,
      trackingId: parcel.trackingId
    };
    
    let message = `Parcel Status is update with ${status.split('_').join('')}`
    
    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: message,
            showConfirmButton: false,
            timer: 2500,
          });
        }
      });
  };

  return (
    <div className="w-11/12 p-12 mx-auto">
      <h2 className="text-4xl font-bold text-secondary">
        Parcels Pending Pickup: {parcels.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Confirm</th>
              <th>Other Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>
                  {
                    parcel.deliveryStatus === 'driver_assigned' ?
                    <>
                    <button
                    onClick={() => handleAcceptDelivery(parcel, 'rider_arriving')}
                    className="text-white btn-primary"
                  >
                    Accept
                  </button>
                  <button className="text-white btn-warning ms-2">
                    Reject
                  </button>
                    </> : 
                    <span>Accepted</span>
                    }
                </td>
                <td>
                    <button
                    onClick={() => handleDeliveryStatusUpdate(parcel, 'parcel_picked_up')}
                    className="text-white btn-primary"
                  >
                    Mark as Picked Up
                  </button>

                  <button
                    onClick={() => handleDeliveryStatusUpdate(parcel, 'parcel_delivery')}
                    className="text-white btn-primary"
                  >
                    Mark as Picked Up
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

export default AssignedDeliveries;
