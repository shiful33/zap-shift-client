import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaEye, FaUserCheck } from "react-icons/fa6";
import { IoPersonRemove } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();

  const { refetch, data: riders = [] } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  const updateRiderStatus = (rider, status) => {
     const updateInfo = { status: status, email: rider.email };
    axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Riders status is set to ${status}.`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  }

  const handleApproval = (rider) => {
    updateRiderStatus(rider, 'approved');
  };

  const handleRejection = (rider) => {
    updateRiderStatus(rider, 'rejected')
  }


  const handleApprovalDelete = (id) => {
      axiosSecure.delete(`/riders/${id}`).then((res) => {
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

  return (
    <div className="p-12">
      <h2 className="mb-8 text-4xl font-bold text-secondary">
        Riders Pending Approval: {riders.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr className="text-[19px] font-bold">
              <th>SL</th>
              <th>Name</th>
              <th>Email</th>
              <th>District</th>
              <th>Application Status</th>
              <th>Work Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr key={rider._id}>
                <th>{index + 1}</th>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.district}</td>
                <td className="font-semibold">
                    <p className={`${rider.status === 'approved' ? 'text-green-600' : 'text-red-500'}`}>{rider.status}</p>
                </td>

                <td>{rider.workStatus}</td>
                
                <td className="flex gap-4">
                  <button
                    className="btn"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => handleApproval(rider)}
                    className="btn"
                  >
                    <FaUserCheck />
                  </button>
                  <button 
                  onClick={() => handleRejection(rider)}
                  className="btn">
                    <IoPersonRemove />
                  </button>
                  <button 
                  onClick={() => handleApprovalDelete(rider)}
                  className="btn">
                    <FaTrashAlt />
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

export default ApproveRiders;
