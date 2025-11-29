import React from "react";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useLoaderData, useNavigate } from "react-router";
import agentPending from "../../assets/agentPending.png";
import Swal from "sweetalert2";

const Rider = () => {
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

  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const senderRegion = useWatch({ control, name: "senderRegion" });

  const handleRiderApplication = (data) => {
    console.log(data);
    axiosSecure.post("/riders", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your application has been submitted. We'll reach out within 48hrs",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  return (
    <div className="w-11/12 p-12 mx-auto">
      <h2 className="text-4xl font-bold text-secondary">Be a Rider</h2>
      <p className="my-6 w-[650px]">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
      </p>

      <form onSubmit={handleSubmit(handleRiderApplication)}>
        {/* Rider Details */}
        <div className="items-center justify-between gap-20 lg:flex">
          <div className="w-[50%]">
            <div>
              <fieldset className="fieldset">
                {/* Sender Name */}
                <h4 className="text-[20px] font-semibold mb-4">
                  Tell us about yourself
                </h4>
                <label className="font-semibold label text-[16px]">
                  Your Name
                </label>
                <input
                  type="text"
                  {...register("yourName")}
                  defaultValue={user?.displayName}
                  className="w-full input"
                  placeholder="Your Name"
                />

                {/* Driving License Number */}
                <label className="font-semibold label text-[16px]">
                  Driving License Number
                </label>
                <input
                  type="text"
                  {...register("licenseNumber")}
                  //   defaultValue={user?.displayName}
                  className="w-full input"
                  placeholder="Driving License Number"
                />

                {/* Sender Email */}
                <label className="font-semibold label text-[16px] mt-4">
                  Your Email
                </label>
                <input
                  type="email"
                  {...register("email")}
                  defaultValue={user?.email}
                  className="w-full input"
                  placeholder="Sender Email"
                />

                {/* Rider Region */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-[15px]">
                    Rider Regions
                  </legend>
                  <select
                    {...register("region")}
                    defaultValue="Pick a browser"
                    className="w-full select"
                  >
                    <option disabled={true}>Regions</option>
                    {regions.map((r, i) => (
                      <option key={i} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </fieldset>

                {/* Rider District */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-[15px]">
                    Rider District
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

                {/* Your District */}
                <label className="font-semibold label text-[16px] mt-4">
                  District
                </label>
                <input
                  type="text"
                  {...register("district")}
                  className="w-full input"
                  placeholder="Your District"
                />

                {/* NID No */}
                <label className="font-semibold label text-[16px] mt-4">
                  NID No
                </label>
                <input
                  type="text"
                  {...register("nid")}
                  className="w-full input"
                  placeholder="NID No"
                />

                {/* Phone No */}
                <label className="font-semibold label text-[16px] mt-4">
                  Phone No
                </label>
                <input
                  type="number"
                  {...register("phone")}
                  className="w-full input"
                  placeholder="Phone No"
                />

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
            <img src={agentPending} alt="" />
          </div>
        </div>
        <input
          type="submit"
          className="mt-8 text-white bg-primary btn w-[350px]"
          value="Apply as a Rider"
        />
      </form>
    </div>
  );
};

export default Rider;
