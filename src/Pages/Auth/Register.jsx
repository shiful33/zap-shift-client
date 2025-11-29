import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import userImg from "../../assets/userImg.png";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import axios from "axios";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../Firebase/firebase.init";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const axiosSecure = useAxiosSecure();
  // const [show, setShow] = useState(false);
  // const [error, setError] = useState("");

  const handleRegistration = (data) => {
    
    const profileImg = data.photo[0];
    
    registerUser(data.email, data.password)
      .then(() => {

        // Store the image in form data
        const formData = new FormData();
        formData.append('image', profileImg);

        // Send the photo to store and get the url
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`

        axios.post(image_API_URL, formData)
        .then(res => {
          const photoURL = res.data.data.url;

          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoURL: photoURL
          }

          axiosSecure.post('/users', userInfo)
          .then(res => {
            if(res.data.insertedId) {
              console.log('user created in the database');
            }
          })

          const userProfile = {
            displayName : data.name,
            photoURL: photoURL
          }
          updateUserProfile(userProfile)
          .then(() => {
            console.log('user profile update done');
            navigate(location.state || "/");
          })
          .catch(error => console.log(error))
        })
      })
      .catch((error) => {
        console.log(error);
      });
  };


  // Forgot Password
    const handleForgetPassword = () => {
      const currentEmail = emailRef.current?.value?.trim();
  
      if (!currentEmail) {
        toast.error("Please enter your email first.");
        return;
      }
  
      if (!/^\S+@\S+\.\S+$/.test(currentEmail)) {
        toast.error("Please enter a valid email.");
        return;
      }
  
      sendPasswordResetEmail(auth, currentEmail)
        .then(() => {
          toast.success(`Password reset link sent to ${currentEmail}`);
        })
        .catch((error) => {
          console.error("Reset error:", error);
          if (error.code === "auth/user-not-found") {
            toast.error("No user found with this email.");
          } else {
            toast.error("Failed to send reset link.");
          }
        });
    };

  return (
    <div className="lg:min-h-[780px] flex items-center">
      <div className="w-full max-w-sm p-6 shadow-2xl card bg-base-100 shrink-0">
        <h2 className="ml-6 text-3xl font-extrabold text-start text-secondary">
          Create An Account
        </h2>
        <p className="mt-3 mb-6 ml-6 text-sm font-bold text-start">
          Please Register With Zap Service
        </p>
        <img src={userImg} alt="" className="w-[44px] ml-6 bg-gray-100 rounded-full p-2"/>
        <form onSubmit={handleSubmit(handleRegistration)}>
          <div className="card-body">
            <fieldset className="fieldset">
              {/* Name */}
              <label className="font-bold label">Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="input"
                placeholder="Name"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">Name is required.</p>
              )}

              {/* Photo Upload */}
              <label className="font-bold label">Photo Upload</label>
              <input
                type="file"
                {...register("photo", { required: true })}
                className="file-input"
                placeholder="Photo"
              />
              {errors.photo?.type === "required" && (
                <p className="text-red-500">Photo is required.</p>
              )}
              
              {/* Email */}
              <label className="font-bold label">Email</label>
              <input
                type="email"
                // ref={emailRef}
                {...register("email", { required: true })}
                ref={(e) => {
                  register("email").ref(e); 
                  emailRef.current = e; 
                }}
                className="input"
                placeholder="Email"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">Email is required.</p>
              )}

              {/* Password */}
              <label className="font-bold label">Password</label>
              <input
                type="password"
                {...register("password", { required: true, minLength: 6 })}
                className="input"
                placeholder="Password"
              />

              {errors.password?.type === "required" && (
                <p className="text-red-500">Password is requires.</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500">
                  Password must be 6 characters longer
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-500">
                  পার্সেল ট্র্যাকিং আইডি ভুল। আবার চেক করুন।
                </p>
              )}
              
              <div>
                <a onClick={handleForgetPassword} className="link link-hover">
                  Forgot password?
                </a>
              </div>
              {/* {error && <p className="text-sm text-red-500">{error}</p>} */}
              
              <button className="mt-4 btn btn-secondary">Register</button>
            </fieldset>
          </div>
        </form>
        <p className="ml-6 font-semibold ">Already have any account? <Link state={location.state} to="/login" className="underline text-[15px] text-secondary">Login</Link></p>
        <SocialLogin />
      </div>
    </div>
  );
};

export default Register;
