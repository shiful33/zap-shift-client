import React from 'react';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';

const RiderRoute = ({ children }) => {
    const { loading, user } = useAuth();
    const { role, roleLoading } = useRole()
    
    /* if (loading || !user || roleLoading) {
        return <Loading />
    } */

    if (role !== 'rider') {
        return <Forbidden></Forbidden>
    }

    return children;
};

export default RiderRoute;