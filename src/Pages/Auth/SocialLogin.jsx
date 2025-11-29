import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../Hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';


const SocialLogin = () => {

    const { signInGoogle } = useAuth();
    const axiosSecure = useAxiosSecure();
    const location = useLocation();
    const navigate = useNavigate();
    console.log('location in social', location)

    const handleGoogleSignIn = () => {
        signInGoogle()
        .then(result => {
            console.log(result.user);
            

            const userInfo = {
            email: result.user.email,
            displayName: result.user.displayName,
            photoURL: result.user.photoURL
          }

          axiosSecure.post('/user', userInfo)
          .then(res => {
            console.log('user data has been stored', res.data);
            navigate(location.state || '/');
          })
        })
        .catch(error => {
            console.log(error)
        })
    }
    
    return (
        <div>
            <p className="mt-4 font-semibold text-center">Or</p>
            
            <button onClick={handleGoogleSignIn} className="w-full mt-4 btn btn-outline"><FcGoogle className="text-[22px]"/> Login With Google</button>
        </div>
    );
};

export default SocialLogin;