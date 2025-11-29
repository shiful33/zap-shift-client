import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm();

  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((c) => c.region);

  const regions = [...new Set(regionsDuplicate)];
  const senderRegion = useWatch({ control, name: "senderRegion" });

  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const handleSendParcel = (data) => {
    console.log(data);
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;

    const parcelWeight = parseFloat(data.parcelWeight);

    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;

        cost = minCharge + extraCharge;
      }
    }
    console.log("cost", cost);
    data.cost = cost;

    Swal.fire({
      title: "Please confirm your purchase",
      text: `You will be charged ${cost} Tk!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm Payment!",
    }).then((result) => {
      if (result.isConfirmed) {
        // save the parcel info to
        axiosSecure.post("/parcels", data).then((res) => {
          console.log("After saving parcel", res.data);
          if (res.data.insertedId) {
            navigate('/dashboard/my-parcels');
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your Parcel has created. Pay now",
              showConfirmButton: false,
              timer: 2500,
            });
          }
        });
      }
    });
  };

  return (
    <div className="w-11/12 p-12 mx-auto bg-white rounded-lg shadow-2xl mb-[100px]">
      <h2 className="text-[56px] font-extrabold text-secondary">
        Send A Parcel
      </h2>
      <p className="text-[28px] font-extrabold mt-7">
        Enter your parcel details
      </p>

      <form onSubmit={handleSubmit(handleSendParcel)}>
        {/* Parcel type */}
        <div className="flex gap-12 my-6">
          <label className="label">
            <input
              type="radio"
              {...register("parcelType")}
              value="document"
              className="radio text-[#CAEB66]"
              defaultChecked
            />
            Document
          </label>

          <label className="label">
            <input
              type="radio"
              {...register("parcelType")}
              value="non-document"
              className="radio text-[#CAEB66]"
            />
            Non-Document
          </label>
        </div>

        {/* Parcel info: name, weight */}
        <div className="flex gap-12 mb-12">
          <fieldset className="fieldset w-[50%]">
            <label className="font-semibold label text-[16px]">
              Parcel Name
            </label>
            <input
              type="text"
              {...register("parcelName")}
              className="w-full input"
              placeholder="Parcel Name"
            />
          </fieldset>
          <fieldset className="fieldset w-[50%]">
            <label className="font-semibold label text-[16px]">
              Parcel Weight (Kg)
            </label>
            <input
              type="number"
              {...register("parcelWeight")}
              className="w-full input"
              placeholder="Parcel Weight"
            />
          </fieldset>
        </div>

        {/* Sender Details */}
        <div className="flex gap-12">
          <div className="w-[50%]">
            <div>
              <h4 className="text-[20px] font-semibold mb-4">Sender Details</h4>
              <fieldset className="fieldset">
                {/* Sender Name */}
                <label className="font-semibold label text-[16px]">
                  Sender Name
                </label>
                <input
                  type="text"
                  {...register("senderName")}
                  defaultValue={user?.displayName}
                  className="w-full input"
                  placeholder="Sender Name"
                />

                {/* Sender Email */}
                <label className="font-semibold label text-[16px] mt-4">
                  Sender Email
                </label>
                <input
                  type="email"
                  {...register("senderEmail")}
                  defaultValue={user?.email}
                  className="w-full input"
                  placeholder="Sender Email"
                />

                {/* Sender Address */}
                <label className="font-semibold label text-[16px] mt-4">
                  Sender Address
                </label>
                <input
                  type="text"
                  {...register("senderAddress")}
                  className="w-full input"
                  placeholder="Sender Address"
                />

                {/* Sender Regions */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-[15px]">
                    Sender Regions
                  </legend>
                  <select
                    {...register("senderRegion")}
                    defaultValue="Pick a browser"
                    className="w-full select"
                  >
                    <option disabled={true}>Sender Regions</option>
                    {regions.map((r, i) => (
                      <option key={i} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </fieldset>

                {/* Sender District */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-[15px]">
                    Sender District
                  </legend>
                  <select
                    {...register("senderDistrict")}
                    defaultValue="Pick a District"
                    className="w-full select"
                  >
                    <option disabled={true}>Pick a District</option>
                    {districtsByRegion(senderRegion).map((d, i) => (
                      <option key={i} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </fieldset>

                {/* Pickup Textarea */}
                <label className="font-semibold label text-[16px] mt-4">
                  Pickup Instruction
                </label>
                <textarea
                  placeholder="Pickup Instruction"
                  className="w-full textarea textarea-secondary"
                ></textarea>
              </fieldset>
            </div>
          </div>

          <div className="w-[50%]">
            <div>
              <h4 className="text-[20px] font-semibold mb-4">
                Sender Receiver
              </h4>
              <fieldset className="fieldset">
                {/* Sender Name */}
                <label className="font-semibold label text-[16px]">
                  Receiver Name
                </label>
                <input
                  type="text"
                  {...register("receiverName")}
                  className="w-full input"
                  placeholder="Receiver Name"
                />

                {/* Receiver Email */}
                <label className="font-semibold label text-[16px] mt-4">
                  Receiver Email
                </label>
                <input
                  type="email"
                  {...register("receiverEmail")}
                  className="w-full input"
                  placeholder="Receiver Email"
                />

                {/* Sender Address */}
                <label className="font-semibold label text-[16px] mt-4">
                  Receiver Address
                </label>
                <input
                  type="text"
                  {...register("receiverAddress")}
                  className="w-full input"
                  placeholder="Receiver Address"
                />

                {/* Receiver Regions */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-[15px]">
                    Receiver Regions
                  </legend>
                  <select
                    {...register("receiverRegion")}
                    defaultValue="Pick a Receiver"
                    className="w-full select"
                  >
                    <option disabled={true}>Receiver Regions</option>
                    {regions.map((r, i) => (
                      <option key={i} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </fieldset>

                {/* Receiver District */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-[15px]">
                    Receiver District
                  </legend>
                  <select
                    {...register("receiverDistrict")}
                    defaultValue="Pick a District"
                    className="w-full select"
                  >
                    <option disabled={true}>Pick a Receiver</option>
                    {districtsByRegion(receiverRegion).map((d, i) => (
                      <option key={i} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </fieldset>

                {/* Delivery Textarea */}
                <label className="font-semibold label text-[16px] mt-4">
                  Delivery Instruction
                </label>
                <textarea
                  placeholder="Delivery Instruction"
                  className="w-full textarea textarea-secondary"
                ></textarea>
              </fieldset>
            </div>
          </div>
        </div>

        <p className="mt-8 text-[14px] font-semibold">
          * PickUp Time 4pm-7pm Approx.
        </p>
        <input
          type="submit"
          className="mt-8 text-white bg-secondary btn w-[350px]"
          value="Proceed to Confirm Booking"
        />
      </form>
    </div>
  );
};

export default SendParcel;
