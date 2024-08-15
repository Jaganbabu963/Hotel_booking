import { useEffect, useState } from 'react';
import AccountNav from './AccountNav';
import axios from 'axios';
import { differenceInCalendarDays, format } from 'date-fns';
import { Link } from 'react-router-dom';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios
      .get('/bookings')
      .then((response) => {
        setBookings(response.data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);
  return (
    <>
      <AccountNav />
      <div className="grid gap-1 lg:grid-cols-2 sm:grid-cols-1">
        {bookings.length > 0 &&
          bookings.map((book) => (
            <Link
              key={book._id}
              to={`/account/bookings/${book._id}`}
              className=" flex gap-5 w-fit bg-gray-300 rounded-2xl py-1px-4 my-4 "
            >
              {book.place.photos.length > 0 && (
                <div className="w-64 h-grow overflow-hidden">
                  <img
                    className="rounded-lg h-full object-cover"
                    src={`http://localhost:3000/api/uploads/${book.place.photos[0]}`}
                    alt=""
                  />
                </div>
              )}
              <div className=" w-full self-center">
                <h1 className="font-semibold text-2xl">{book.place.title}</h1>
                <div className="flex gap-3 items-center mt-1 font-serif opacity-70">
                  <span className=" font-semibold"> From: </span>{' '}
                  {format(new Date(book.checkIn), 'yyyy-MM-dd')}
                  <span className=" font-semibold"> To: </span>{' '}
                  {format(new Date(book.checkOut), 'yyyy-MM-dd')}
                  <p>
                    <span className=" font-semibold"> Guests: </span>
                    {book.guests}
                  </p>
                </div>

                <div>
                  <p>
                    Total{' '}
                    {differenceInCalendarDays(
                      new Date(book.checkOut),
                      new Date(book.checkIn)
                    )}{' '}
                    Days
                  </p>
                  <p className="font-semibold text-xl">
                    Total Price :Rs.{book.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
};

export default Bookings;
