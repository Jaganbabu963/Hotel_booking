import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import PlacePhoto from '../PlacePhoto';
// import PlacePhoto from '../PlacePhoto';

const ExposePage = () => {
  const [place, setPlace] = useState([]);
  useEffect(() => {
    axios
      .get('/newplace')
      .then(({ data }) => setPlace(data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      {place.length > 0 &&
        place.map((p) => {
          return (
            <div key={p._id}>
              <Link
                to={`/account/accommodations/${p._id}`}
                className="flex items-center bg-gray-300 p-2 rounded-2xl gap-2 text-center mt-2"
              >
                <div className=" h-32 w-34 grow shrink-0">
                  <>
                    {p.photos.length > 0 && (
                      <img
                        className="rounded-2xl h-full object-cover"
                        src={`http://localhost:3000/api/uploads/${p.photos[0]}`}
                        alt=""
                      />
                    )}
                    {/* <PlacePhoto place={p} /> */}
                  </>
                </div>
                <div className=" flex-auto" key={p._id}>
                  <h1 className=" font-semibold">{p.title}</h1>
                  <p className="text-left">{p.description}</p>
                </div>
              </Link>
            </div>
          );
        })}
    </>
  );
};

export default ExposePage;
