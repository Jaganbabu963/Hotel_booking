import { useContext, useEffect, useState } from 'react';
import { differenceInCalendarDays } from 'date-fns';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const BookingWidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [redirect, setRedirect] = useState('');

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);
  let numOfDays = 0;

  if (checkIn && checkOut) {
    numOfDays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }

  const bookThis = async () => {
    const response = await axios.post('/bookings', {
      checkIn,
      checkOut,
      guests,
      name,
      mobile,
      place: place._id,
      price: numOfDays * guests * place.price,
    });
    setRedirect(`/account/bookings/${response.data._id}`);
  };
  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <>
      <div className="bg-white p-2 rounded-xl flex flex-col h-fit">
        <span className="text-center text-2xl font-bold">
          Price Rs.{place.price}/day
        </span>
        <div className="mt-3 border p-1 rounded-xl">
          <div className="grid  grid-cols-2">
            <div className="border-r-2">
              <label> CheckIn:</label>
              <input
                className="outline-none ml-3"
                type="date"
                name="CheckIn"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
                id=""
              />
            </div>

            <div className="ml-2">
              <label>CheckOut:</label>
              <input
                className="outline-none ml-3"
                type="date"
                name="CheckOut"
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
                id=""
              />
            </div>
          </div>
          <div className="border rounded-lg p-2 mt-3">
            <label>Max Guests</label>
            <input
              className="ml-4 outline-none"
              type="number"
              placeholder="Max Guests"
              value={guests}
              onChange={(ev) => setGuests(ev.target.value)}
              id=""
            />
          </div>
          {numOfDays > 0 && guests > 0 && (
            <>
              <div className="border rounded-lg p-2 mt-3">
                <label>Name</label>
                <input
                  className="ml-4 outline-none"
                  type="text"
                  placeholder="Your Full Name"
                  value={name}
                  onChange={(ev) => setName(ev.target.value)}
                  id=""
                />
              </div>
              <div className="border rounded-lg p-2 mt-3">
                <label>Mobile No.</label>
                <input
                  className="ml-4 outline-none"
                  type="tel"
                  placeholder="Your Full Name"
                  value={mobile}
                  onChange={(ev) => setMobile(ev.target.value)}
                  id=""
                />
              </div>
            </>
          )}
        </div>

        <div className=" bg-blue-600 p-1 font-semibold text-lg flex items-center justify-center rounded-xl mt-2 text-white">
          <button onClick={bookThis} type="button">
            Book
            {numOfDays > 0 &&
              guests > 0 &&
              ` This at Rs.${numOfDays * place.price * guests}`}
          </button>
        </div>
      </div>
    </>
  );
};

export default BookingWidget;
