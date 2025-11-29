import React from 'react';
import useAuth from '../Hooks/useAuth';
import { FourSquare } from 'react-loading-indicators';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div>
                <FourSquare color="#CAEB66" size="medium" text="" textColor="" />
            </div>
        )
    }

    if(!user) {
        return <Navigate state={location.pathname} to="/login"/>
    }

    return children;
};

export default PrivateRoute;