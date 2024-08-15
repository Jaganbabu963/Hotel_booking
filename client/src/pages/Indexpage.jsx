import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Indexpage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios
      .get('/allplaces')
      .then((response) => {
        // console.log(response.data);

        setPlaces(response.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-9">
      {places.length > 0 &&
        places.map((p) => (
          <Link key={p._id} to={`/${p._id}`}>
            <div className="rounded-2xl">
              {p.photos?.[0] && (
                <img
                  className="rounded-2xl aspect-square object-cover"
                  src={`http://localhost:3000/api/uploads/${p.photos[0]}`}
                  alt=""
                />
              )}
            </div>
            <h2 className="font-bold p-1 leading-4">{p.address}</h2>
            <h2 className="text-sm p-1 leading-3">{p.title}</h2>
            {p.price && (
              <p>
                <span className="font-semibold p-1">Rs.{p.price}</span> per Day
              </p>
            )}
          </Link>
        ))}
    </div>
  );
};

export default Indexpage;
