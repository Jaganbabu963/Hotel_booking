import { useState } from 'react';

const PlaceGallery = ({ place }) => {
  const [morePhotos, setMorePhotos] = useState(false);

  if (morePhotos) {
    return (
      <>
        <div className="absolute inset-0 bg-black max-h-screen">
          <button
            onClick={() => setMorePhotos(false)}
            className="fixed flex items-center gap-1 right-0 m-10 px-2 py-1 rounded-2xl bg-gray-500 text-white shadow-2xl "
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
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Close
          </button>
          <div className=" mt-10 flex flex-col bg-black items-center gap-2">
            {place?.photos?.length > 0 &&
              place.photos.map((ele) => (
                <div className="h-80 flex">
                  <img
                    className=" object-cover"
                    src={`http://localhost:3000/api/uploads/${ele}`}
                    alt=""
                    srcset=""
                  />
                </div>
              ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      <div className="mt-2 relative grid gap-2 grid-cols-[1.8fr_1.2fr] ">
        <div className="flex h-80">
          {place.photos?.[0] && (
            <img
              className=" aspect-square object-cover w-full rounded-xl"
              src={`http://localhost:3000/api/uploads/${place.photos[0]}`}
              alt=""
            />
          )}
        </div>
        <div className="flex flex-col gap-2 max-h-80 overflow-hidden">
          <div className="flex h-40">
            {' '}
            {place.photos?.[1] && (
              <img
                className=" aspect-square object-cover rounded-xl"
                src={`http://localhost:3000/api/uploads/${place.photos[1]}`}
                alt=""
              />
            )}
          </div>
          <div className=" flex h-40 ">
            {place.photos?.[2] && (
              <img
                className="  object-cover rounded-xl "
                src={`http://localhost:3000/api/uploads/${place.photos[2]}`}
                alt=""
              />
            )}
          </div>
        </div>
        <button
          onClick={() => setMorePhotos(true)}
          className="absolute right-1 bottom-1 flex gap-1 p-1 items-center bg-white border-black bg-opacity-60 rounded-lg"
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
              d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          Show more
        </button>
      </div>
    </div>
  );
};

export default PlaceGallery;
