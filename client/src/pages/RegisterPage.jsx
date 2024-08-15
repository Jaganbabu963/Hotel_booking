import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const registerUser = async (ev) => {
    ev.preventDefault();
    await axios.post('/register', {
      name,
      email,
      password,
      confirmPassword,
      //
    });
    setRedirect(true);
  };
  if (redirect) {
    return <Navigate to={'/login'} />;
  }

  return (
    <div className="grow flex">
      <div className=" m-3 grow flex flex-col ">
        <form className="max-w-md m-auto" onSubmit={registerUser}>
          <h1 className=" text-4xl text-center my-1">Register</h1>
          <input
            type="name"
            placeholder="User name"
            value={name}
            onChange={(ev) => {
              setName(ev.target.value);
            }}
          />
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
          <input
            type="confirmPassword"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(ev) => {
              setConfirmPassword(ev.target.value);
            }}
          />
          <button className="primary">Register</button>
          <div className="w-full text-center">
            Already a member?{' '}
            <Link to={'/Login'} className="ml-1 font-semibold underline">
              Login
            </Link>{' '}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
