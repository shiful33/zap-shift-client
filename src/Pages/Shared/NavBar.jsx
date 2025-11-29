import React from "react";
import Logo from "../../Components/Logo/Logo";
import { Link, NavLink } from "react-router";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import useAuth from "../../Hooks/useAuth";

const NavBar = () => {
  
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
    .then()
    .catch(error => {
      console.log(error)
    })
  }
  
  const links = (
    <>
      <li>
        <NavLink to="">Services</NavLink>
      </li>
      <li>
        <NavLink to="aboutUs">About Us</NavLink>
      </li>
      <li>
        <NavLink to="/coverage">Coverage</NavLink>
      </li>
      <li>
        <NavLink to="/send-parcel">Send Parcel</NavLink>
      </li>
      <li>
        <NavLink to="/rider">Be a Rider</NavLink>
      </li>
      {
        user && 
        <>
        <li>
        <NavLink to="/dashboard/my-parcels">My Parcels</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
        </>
      }
    </>
  );

  return (
    <div className="pt-4 mb-8">
      <div className="p-4 shadow-md navbar bg-base-100 rounded-s-4xl">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="p-2 mt-3 shadow menu menu-sm dropdown-content bg-base-100 rounded-box z-1 w-52"
            >
              <li>
                <ul className="p-2">{links}</ul>
              </li>
            </ul>
          </div>
         <div>
             <Logo />
         </div>
        </div>
        <div className="hidden navbar-center lg:flex">
          <ul className="px-1 menu menu-horizontal">
            {links}
          </ul>
        </div>
        <div className="grid gap-4 navbar-end lg:flex">
          
          {/* Sign In & Sign Out Logic */}
          {
            user ? 
            <button onClick={handleLogOut} className="btn text-[20px] font-bold bg-outline">sign Out</button> : 
            <Link to="/login" className="btn text-[20px] font-bold bg-outline">Sign In</Link>
          }
          <Link to="/rider" className="btn text-[20px] font-bold bg-[#CAEB66]">Be a Rider</Link>
          <BsArrowUpRightCircleFill className="text-[35px] ml-[-15px]"/>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
