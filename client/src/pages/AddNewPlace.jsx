import { useEffect, useState } from 'react';
import PerksPage from './PerksPage';
import PhotoUploader from '../PhotoUploader';
import axios from 'axios';

import AccountNav from './AccountNav';
import { Navigate, useParams } from 'react-router-dom';

const formatDateTimeLocal = (isoDateTime) => {
  const date = new Date(isoDateTime);
  return date.toISOString().slice(0, 16);
};

const AddNewPlace = () => {
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedphotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState('');
  const [perks, setPerks] = useState([]);
  const [price, setPrice] = useState([]);
  const [redirect, setRedirect] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/user-placebyid/${id}`).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setExtraInfo(data.extraInfo);
      setCheckIn(formatDateTimeLocal(data.checkIn));
      setCheckOut(formatDateTimeLocal(data.checkOut));
      setPerks(data.perks);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  const inputHeader = (text) => {
    return (
      <>
        <h1 className="text-2xl font-medium ">{text}</h1>
      </>
    );
  };
  const inputDescription = (text) => {
    return (
      <>
        <p className=" text-sm text-gray-500 -mt-1">{text}</p>
      </>
    );
  };

  const preInput = (header, description) => {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  };
  const addNewPlace = async (ev) => {
    ev.preventDefault();

    const placeInfo = {
      title,
      address,
      addedphotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };

    if (id) {
      // update
      await axios.patch(`/updatebyid/${id}`, placeInfo);
      setRedirect(true);
    } else {
      await axios.post('/addnewplace', placeInfo);
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to={'/account/accommodations'} />;
  }

  return (
    <>
      <AccountNav />

      <div className="max-w-full">
        <div className="mt-2">
          {preInput('Title', 'Give an Catchy Title')}

          <input
            className="w-full  border p-2 rounded-md"
            type="Title"
            placeholder="Enter the Title of New Place"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />
        </div>
        <div className="mt-2">
          {preInput('Address', 'Enter the address of the Place')}

          <input
            className="w-full border p-2 rounded-md"
            type="Title"
            placeholder="Address"
            value={address}
            onChange={(ev) => setAddress(ev.target.value)}
          />
        </div>

        <div className="mt-2">
          {preInput('Photos', 'Add photos')}
          <PhotoUploader addedphotos={addedphotos} onChange={setAddedPhotos} />
        </div>
        <div className="mt-2">
          {preInput('Decription', ' Add deccription of the Place')}

          <textarea
            className="w-full  border p-2 rounded-md h-50"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
        </div>
        {preInput('ExtraInfo', 'House Rules..etc')}
        <textarea
          className="w-full  border p-2 rounded-md h-50"
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
        />
        {preInput('Perks', 'select all perks of your place')}

        <PerksPage selected={perks} onChange={setPerks} />
        {preInput('Stay', 'add details')}

        <div className=" grid items-center gap-1 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          <label>
            <p className="text-sm">Check-In Time</p>
            <input
              className="border rounded-md p-1"
              type="datetime-local"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </label>
          <label className="">
            <p className="text-sm">Check-Out Time</p>
            <input
              className="border rounded-md p-1"
              type="datetime-local"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </label>
          <label className="">
            <p className="text-sm">MaxNumber of Guests</p>
            <input
              className="border rounded-md p-1"
              type="number"
              value={maxGuests}
              onChange={(ev) => setMaxGuests(ev.target.value)}
            />
          </label>
          <label className="">
            <p className="text-sm">Price per Day</p>
            <input
              className="border rounded-md p-1"
              type="number"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
            />
          </label>
        </div>
        <button
          onClick={addNewPlace}
          className="w-full mt-3 p-2 border rounded-full bg-blue-500 text-white text-xl"
        >
          Save
        </button>
      </div>
    </>
  );
};

export default AddNewPlace;
