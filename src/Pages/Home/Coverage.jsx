import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const position = [23.685, 90.3563];
  const serviceCenters = useLoaderData();
  const mapRef = useRef(null);
//   console.log(serviceCenters);

  const handleSearch = e => {
    e.preventDefault();
    const location = e.target.location.value;
    const district = serviceCenters.find( c => c.district.toLowerCase().includes(location.toLowerCase()));
    if(district) {
        const coord = [district.latitude, district.longitude];
        mapRef.current.flyTo(coord, 14);
    }
  }

  return (
    <>
      <div className="mb-[100px] mt-[80px]">
        <div className="w-10/12 mx-auto mb-6">
          <div className="text-start">
          <h2 className="text-[56px] font-bold text-secondary mb-4">We are available in 64 districts</h2>
        </div>
        <div>
          <form onSubmit={handleSearch} className="mb-12">
            <label className="rounded-full input w-[500px]">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="3.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="10"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
                  <path d="m21 21-4.3-4.3"></path>
              <input type="search" className=""
              name="location"
              placeholder="Search here" />
              <button className="bg-[#CAEB66] px-6 py-2 rounded-full mr-[-11px] font-semibold">Search</button>
            </label>
          </form>
        </div>
        </div>

        <div className="w-10/12 mx-auto border-4 border-white shadow-lg rounded-xl">
        <h4 className="text-[30px] font-extrabold text-secondary my-12">We deliver almost all over Bangladesh</h4>
          <MapContainer
            center={position}
            zoom={8}
            scrollWheelZoom={false}
            className="h-[600px]"
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {serviceCenters.map((center) => (
              <Marker position={[center.latitude, center.longitude]}>
                <Popup>
                  <strong>{center.district}</strong> <br /> Service Area:{" "}
                  {center.covered_area.join(", ")}.
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </>
  );
};

export default Coverage;
