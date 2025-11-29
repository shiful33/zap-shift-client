import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  const {userName, designation, user_photoURL} = review;

  return (
    <div className="">
      <div className="pt-6 shadow-lg bg-base-100 w-96">
        <FaQuoteLeft className="ml-6 text-4xl text-secondary opacity-70"/>
        <div className="bg-white card-body">
          <p>
            A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.
          </p>
          <div className="justify-start mt-4 card-actions">
            <img src={user_photoURL} alt="" className="w-12 rounded-full shadow-md" />
            <div>
                <h2 className="card-title">{userName}</h2>
                <p>{designation}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
