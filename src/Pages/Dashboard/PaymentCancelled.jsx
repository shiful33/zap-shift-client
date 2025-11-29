import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div className='p-6'>
            <h2 className="text-2xl">Payment is cancelled please try again</h2>
            <Link to="/dashboard/my-parcels">
            <button className="btn btn-primary text-white mt-2">Try Again</button>
            </Link>
        </div>
    );
};

export default PaymentCancelled;