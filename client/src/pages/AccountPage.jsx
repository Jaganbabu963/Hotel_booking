import { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';

import AccountNav from './AccountNav';

const AccountPage = () => {
  const { user, ready, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  let { subpage } = useParams();

  const handlelogOut = async () => {
    await axios.post('/logout');
    setUser(null);
    setRedirect('/');
  };

  if (!ready) {
    return 'Loading.....';
  }

  if (ready && !user && !redirect) {
    return <Navigate to="/login" />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === undefined && (
        <div className=" text-center ">
          Logged in as {user.name} ({user.email})<br />
          <button
            onClick={handlelogOut}
            className=" bg-red-500 px-2 pb-1 rounded-md mt-2"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
