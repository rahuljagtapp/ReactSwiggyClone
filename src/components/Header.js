import LOGO_URL from "../utils/constant";
import { useState } from "react";
import { Link } from 'react-router-dom';
import useOnline from "../utils/useOnline";

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const isOnline = useOnline(true);

  return (
    <header className="flex items-center justify-between bg-indigo-500 py-4 px-6">
      <div className="flex items-center">
        <img src={LOGO_URL} alt="logo" className="h-8 w-8" />
        <h1 className="text-white ml-2 text-lg font-semibold">RahulFoodVilla</h1>
      </div>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white hover:text-indigo-200">Home</Link>
          </li>
          <li>
            <Link to="/contact" className="text-white hover:text-indigo-200">Contact</Link>
          </li>
          <li>
            <Link to="/about" className="text-white hover:text-indigo-200">About Us</Link>
          </li>
          <li>
            <Link to="/cart" className="text-white hover:text-indigo-200">Cart</Link>
          </li>
          <li>
            <Link to="/instamart" className="text-white hover:text-indigo-200">InstaMart</Link>
          </li>
        </ul>
      </nav>
      <div className="flex items-center">
        <h1 className={`text-white ${isOnline ? 'text-green-500' : 'text-red-500'}`}>
          {isOnline ? "✅" : "🔴"}
        </h1>
        {loggedIn ? (
          <button
            className="ml-4 bg-white text-indigo-500 hover:bg-indigo-500 hover:text-white py-2 px-4 rounded"
            onClick={() => setLoggedIn(false)}
          >
            Logout
          </button>
        ) : (
          <button
            className="ml-4 bg-white text-indigo-500 hover:bg-indigo-500 hover:text-white py-2 px-4 rounded"
            onClick={() => setLoggedIn(true)}
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;