import { useState } from 'react';
import axios from 'axios';

const PhotoUploader = ({ addedphotos, onChange }) => {
  const [photoLink, setPhotoLink] = useState('');

  const addPhotoLink = async () => {
    try {
      const response = await axios.post('/upload-by-link', { link: photoLink });
      onChange((prev) => {
        return [...prev, response.data];
      });

      setPhotoLink('');
    } catch (err) {
      console.log('Unable to Upload photo', err);
    }
  };

  const uploadPhoto = (ev) => {
    const files = ev.target.files;

    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i]);
    }

    axios
      .post('/uploads', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(({ data: fileName }) =>
        onChange((prev) => {
          const updadtedPhotos = [...prev, ...fileName];
          // console.log(updadtedPhotos);
          return updadtedPhotos;
        })
      )
      .catch((error) => log(error));
    // console.log(addedphotos);
  };

  const delPhoto = (photoName) => {
    onChange([...addedphotos.filter((p) => p != photoName)]);
  };
  const selectFirst = (photoName) => {
    onChange([photoName, ...addedphotos.filter((p) => p != photoName)]);
  };
  return (
    <>
      <div className="flex gap-1 mt-1">
        <input
          className="w-full  border p-2 rounded-md"
          type="link"
          placeholder="Add Photos using Link....Jpd,jpeg"
          value={photoLink}
          onChange={(ev) => setPhotoLink(ev.target.value)}
        />
        <button
          className="bg-gray-500 text-white rounded-md"
          onClick={addPhotoLink}
        >
          Grab Photo
        </button>
      </div>
      <div className="mt-2 flex gap-1 ">
        {addedphotos.length > 0 &&
          addedphotos.map((link) => {
            return (
              <div key={link} className="relative">
                <img
                  className="max-w-44 max-h-24  object-cover rounded-md"
                  src={`http://localhost:3000/api/uploads/${link}`}
                  alt=""
                />
                <button
                  onClick={() => {
                    delPhoto(link);
                  }}
                  className="absolute right-0 bottom-0 text-white bg-black bg-opacity-45 p-2 rounded-xl"
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
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    selectFirst(link);
                  }}
                  className="absolute left-0 bottom-0 text-white bg-black bg-opacity-45 p-2 rounded-xl"
                >
                  {link === addedphotos[0] && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  {link !== addedphotos[0] && (
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
                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            );
          })}

        <label className="relative py-6 px-14 text-2xl border rounded-2xl mt-1 max-w-44  hover:bg-gray-200 cursor-pointer">
          +
          <input
            type="file"
            multiple
            className="absolute w-full top-6 right-0 hidden"
            onChange={uploadPhoto}
          />
        </label>
      </div>
    </>
  );
};

export default PhotoUploader;
