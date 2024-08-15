import React from 'react';
import { Link } from 'react-router-dom';
import AccountNav from './AccountNav';
import ExposePage from './ExposePage';

const PlacesPage = () => {
  // console.log(action);
  // http://localhost:5173/accommodations/new
  return (
    <>
      <AccountNav />
      <div className="text-center">
        <Link
          to={'/account/accommodations/new'}
          className="inline-flex mt-3 items-center gap-1 px-4 py-2 bg-blue-400 rounded-full "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          AddMore Places
        </Link>
      </div>
      <div>
        <ExposePage />
      </div>
    </>
  );
};

export default PlacesPage;
