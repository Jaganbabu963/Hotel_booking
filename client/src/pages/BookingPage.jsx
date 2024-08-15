import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PlaceGallery from '../PlaceGallery';
import { format } from 'date-fns';

const BookingPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState({});

  useEffect(() => {
    if (!id) {
      return '';
    }
    axios
      .get(`/booking/${id}`)
      .then((response) => {
        setBooking(response.data);
        // console.log(response.data);
      })
      .catch((err) => {
        throw err;
      });
  }, [id]);

  if (!booking.place) {
    return <p>Loading.....</p>;
  }
  return (
    <div className="mt-3 p-2 rounded-xl bg-opacity-15">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-semibold text-center">
          {booking.place.title}{' '}
        </h1>
        <a
          className="text-center flex items-center gap-1 underline"
          href={`https://www.google.com/search?q=${booking.place.address}`}
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

          {booking.place.address}
        </a>
      </div>
      <div className="bg-gray-200 py-4 px-6 my-3 rounded-2xl flex items-center justify-between ">
        <div className="">
          {' '}
          <h1 className="underline text-xl font-semibold ">
            Your Booking Info:
          </h1>
          <div className="flex gap-2">
            {' '}
            <span className="  mt-1 font-serif">
              {' '}
              From: {format(new Date(booking.checkIn), 'yyyy-MM-dd')}
            </span>{' '}
            <span className="  mt-1 font-serif">
              {' '}
              To: {format(new Date(booking.checkOut), 'yyyy-MM-dd')}{' '}
            </span>{' '}
          </div>
          <p>
            <span className=" font-semibold"> Guests: </span>
            {booking.guests}
          </p>
        </div>

        <div className=" bg-blue-400 text-white p-4 mr-3 rounded-2xl">
          <div className=" text-xl">Total Price:</div>
          <div className=" font-bold text-xl">Rs.{booking.price}</div>
        </div>
      </div>
      <PlaceGallery place={booking.place} />
    </div>
  );
};

export default BookingPage;
