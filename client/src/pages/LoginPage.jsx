import { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  const loginSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const { data } = await axios.post('./login', {
        email,
        password,
      });
      setUser(data);
      // console.log({ email, password });

      setRedirect(true);
      // alert('Login Successful');
    } catch (err) {
      // alert('Login Failed');
    }
  };

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <>
      <div className="grow flex">
        <div className=" m-3 grow flex flex-col items-center justify-between">
          <form className="max-w-md m-auto " onSubmit={loginSubmit}>
            <h1 className=" text-4xl text-center my-1">Login</h1>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(ev) => {
                setEmail(ev.target.value);
              }}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(ev) => {
                setPassword(ev.target.value);
              }}
            />
            <button className="primary">Login</button>
            <div className="w-full text-center">
              Don't have an Account yet?
              <Link to={'/register'} className=" ml-1 font-semibold underline">
                Register
              </Link>{' '}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
