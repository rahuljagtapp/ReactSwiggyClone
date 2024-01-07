import React from "react";
import { SWIGGY_IMAGE_CDN } from "../utils/constant";

const RestroCard = ({ resData }) => {
  const {
    name,
    cloudinaryImageId,
    cuisines,
    avgRating,
    sla: { deliveryTime },
    costForTwo,
  } = resData?.info;

  return (
    <div className="restroCard bg-white p-4 rounded-lg shadow-md">
      <img
        src={SWIGGY_IMAGE_CDN + cloudinaryImageId}
        alt="restro image"
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <h2 className="text-xl font-bold mt-2">{name}</h2>
      <h3 className="text-gray-600 mb-2">{cuisines.slice(0, 3).join(", ")}</h3>

      <div className="flex justify-between items-center">
        <h4 className="text-gray-600">{deliveryTime} min</h4>
        <h4 className="text-yellow-500">{avgRating} ⭐</h4>
      </div>

      <h4 className="text-lg font-medium mt-2">₹{costForTwo}</h4>
    </div>
  );
};

export default RestroCard;