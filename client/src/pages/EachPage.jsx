import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookingWidget from './BookingWidget';
import PlaceGallery from '../PlaceGallery';

const EachPage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState({});
  useEffect(() => {
    if (!id) {
      return;
    }
    axios
      .get(`/user-placebyid/${id}`)
      .then((response) => setPlace(response.data))
      .then((error) => console.log(error));
  }, [id]);

  return (
    <div className="relative bg-gray-300 mt-4 py-5 -mx-8 px-8 rounded-xl">
      <h1 className="text-2xl font-semibold ">{place.title}</h1>
      <a
        className="flex gap-1 text-sm underline font-medium m-2"
        href={`https://www.google.com/search?q=${place.address}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>

        {place.address}
      </a>
      <PlaceGallery place={place} />

      <div className="grid grid-cols-[2fr_1fr] mt-6">
        <div className=" mx-3">
          <div className="mt-4">
            <h1 className=" text-xl font-medium underline">Description </h1>
            <p>{place.description}</p>
          </div>
          <div className="flex items-center gap-2 p-1">
            <span className=" text-gray-950 underline text-lg font-medium">
              Check-in:
            </span>
            <p>{place.checkIn}</p>
          </div>
          <div className="flex items-center gap-2 p-1">
            <span className=" text-gray-950 underline text-lg font-medium">
              Check-out:
            </span>
            <p>{place.checkOut}</p>
          </div>
          <div className="flex items-center gap-2 p-1">
            <span className=" text-gray-950 underline text-lg font-medium">
              MaxGuests:
            </span>
            <p>{place.maxGuests}</p>
          </div>
        </div>
        <BookingWidget place={place} />
      </div>
      <div className=" mt-3 mx-3">
        <h1 className=" text-2xl font-semibold underline">ExtraInfo</h1>
        <p>{place.extraInfo}</p>
      </div>
    </div>
  );
};

export default EachPage;
