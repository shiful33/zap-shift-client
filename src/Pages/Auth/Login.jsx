import React, { useRef, useState } from "react";
import { useForm, Watch } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../Firebase/firebase.init";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const emailRef = useRef(null);
  // const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then((result) => {
        console.log("Login Success:", result.user);
        toast.success("Login Successful!");
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error);
        setError("Invalid email or password.");
        toast.error("Login failed!");
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
        <h2 className="text-3xl font-extrabold text-center text-secondary">
          Welcome To Back
        </h2>
        <p className="mt-3 text-sm font-bold text-center">
          Please Login With Zap Service
        </p>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="card-body">
            <fieldset className="fieldset">
              {/* Email */}
              <label className="label">Email</label>
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
              <label className="label">Password</label>
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
                  You have mast be use minimum 6 characters with minimum one
                  Uppercase letter and minimum one lowerCase letter with minimum
                  one special character.
                </p>
              )}
              <div>
                <a onClick={handleForgetPassword} className="link link-hover">
                  Forgot password?
                </a>
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}

              <button className="w-full mt-4 btn btn-secondary">Login</button>
            </fieldset>
          </div>
        </form>
        <p className="ml-6 font-semibold">
          Don’t have any account?{" "}
          <Link
            state={location.state}
            to="/register"
            className="underline text-[15px] text-secondary"
          >
            Register
          </Link>
        </p>
        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;
