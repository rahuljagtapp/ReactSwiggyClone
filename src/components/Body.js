import React, { useState, useEffect } from 'react';
import RestroCard from './RestroCard.js';
import Shimmer from "./Shimmer"
import useOnline from '../utils/useOnline.js';

const Body = () => {
  const [searchRestro, setSearchRestro] = useState([]);
  const [filterRestro, setFilterRestro] = useState([]);
  const [userSearchText, setUserSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  // fetching data logic: way 2 using async await (try{} catch(){} )
  const fetchData = async () => {
    try {
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.5898463&lng=73.8264677&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const json = await data.json();

      const restroCards = json?.data?.cards.filter(
        (card) =>
          card?.card?.card?.gridElements?.infoWithStyle["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.FavouriteRestaurantInfoWithStyle"
      )[0].card?.card?.gridElements?.infoWithStyle?.restaurants;

      setSearchRestro(restroCards);
      setFilterRestro(restroCards);
    } catch (err) {
      alert("Something Went Wrong! After Some time please check Again...");
      console.error("Error is " + err);
    }
  };

  // Shimmer UI effect logic: way 1
  const isOnline = useOnline();
  if (!isOnline) {
    return <h1>Offline, please check your internet connection</h1>;
  }
  if (filterRestro.length === 0) return <Shimmer />;

  // Shimmer Ui effect logic: way2
  return filterRestro.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body flex flex-col items-center">
      <div id="featureBox" className="flex items-center justify-center space-x-4 mt-8">
        <div className="search flex items-center">
          <input
            type="text"
            placeholder="Search Restro / Cuisines"
            value={userSearchText}
            onChange={(e) => setUserSearchText(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 mr-4"
          />
          <button
            onClick={() => {
              const filterSearchData = filterRestro.filter(
                (restro) =>
                  restro.info.name
                    .toUpperCase()
                    .includes(userSearchText.toUpperCase()) ||
                  restro.info.cuisines
                    .slice(0, 3)
                    .join(", ")
                    .toLowerCase()
                    .includes(userSearchText.toLowerCase())
              );
              setSearchRestro(filterSearchData);
            }}
            className="bg-indigo-500 text-white px-4 py-2 rounded-md"
          >
            Search
          </button>
        </div>

        <div className="filter">
          <button
            id="topRatedRestroBtn"
            onClick={() => {
              const topRatedRestro = filterRestro.filter(
                (restro) => restro.info.avgRating > 4.2
              );
              setSearchRestro(topRatedRestro);
            }}
            className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-4"
          >
            Top Rated Restaurants
          </button>
        </div>
      </div>

      <div className="restroCardContainer grid grid-cols-3 gap-4">
        {searchRestro.map((restro, index) => (
          <div key={restro.info.id} className={`h-[300px] p-4 ${index % 3 === 0 ? 'space-y-4' : ''}`}>
            <RestroCard resData={restro} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Body;