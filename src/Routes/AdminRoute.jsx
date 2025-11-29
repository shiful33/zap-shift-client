import React from 'react';
import useAuth from '../Hooks/useAuth';
import { useLocation } from 'react-router';
import useRole from '../Hooks/useRole';

const AdminRoute = ({ children }) => {

    const { loading } = useAuth();
    const { role, roleLoading } = useRole()
    
    /* if (loading || roleLoading) {
        return <Loading />
    } */

    /* if (role !== 'admin') {
        return <Forbidden></Forbidden>
    } */

    return children;
};

export default AdminRoute;