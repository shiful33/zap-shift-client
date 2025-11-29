import React from "react";
import { MdProductionQuantityLimits } from "react-icons/md";
import { Link, NavLink, Outlet } from "react-router";
import { FaCreditCard, FaMotorcycle, FaUsers } from "react-icons/fa6";
import { FaTasks, FaUserAlt } from "react-icons/fa";
import useRole from "../Hooks/useRole";
import { RiEBikeFill } from "react-icons/ri";

const DashboardLayout = () => {
  const {role} = useRole();
  return (
    <div>
      <div className="mx-auto drawer lg:drawer-open max-w-7xl">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="w-full navbar bg-base-300">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* Sidebar toggle icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-4"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
            <div className="px-4">Zap Service Dashboard</div>
          </nav>
          {/* Page content here */}
          <Outlet />
          <div className="p-4">Page Content</div>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex flex-col items-start min-h-full bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
            {/* Sidebar content here */}
            <ul className="w-full menu grow">
              {/* List item */}
              <li>
                <Link to="/"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Homepage"
                >
                  {/* Home icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-5"
                  >
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  </svg>
                  <span className="is-drawer-close:hidden text-[22px]">Homepage</span>
                </Link>
              </li>

              {/* Our Dashboard Links */}
              <NavLink to="/dashboard/my-parcels" className="flex gap-2 ml-3 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="my-parcels">
                <MdProductionQuantityLimits className=" text-[22px]"/>
                <span className="is-drawer-close:hidden">My Parcels</span>
                </NavLink>

                <NavLink to="/dashboard/payment-history" className="flex gap-2 ml-3 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="payment-history">
                <FaCreditCard  className="mt-2 text-[22px]"/>
                <span className="is-drawer-close:hidden">Payment History</span>
                </NavLink>

                {
                  role === 'riders' && <>
                <NavLink to="/dashboard/completed -deliveries" className="flex gap-2 ml-3 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Completed Deliveries">
                <SiGoogletasks className="mt-2 text-[22px]"/>
                <span className="is-drawer-close:hidden">Assigned Deliveries</span>
                </NavLink>
                  </>
                }

                
                {
                  role === 'admin' && <>
                  <NavLink to="/dashboard/users-management" className="flex gap-2 ml-3 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Users Management">
                  <FaUsers className="mt-2 text-[22px]"/>
                  Users Management
                </NavLink>
                  </>
                }

                <NavLink to="/dashboard/assign-riders" className="flex gap-2 ml-3 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Assign Riders">
                  <RiEBikeFill className="mt-2 text-[22px]"/>
                  
                </NavLink>

              {/* List item */}
              <li>
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Settings"
                >
                  {/* Settings icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-5"
                  >
                    <path d="M20 7h-9"></path>
                    <path d="M14 17H5"></path>
                    <circle cx="17" cy="17" r="3"></circle>
                    <circle cx="7" cy="7" r="3"></circle>
                  </svg>
                  <span className="is-drawer-close:hidden">Settings</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
