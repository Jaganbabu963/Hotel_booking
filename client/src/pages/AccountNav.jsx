import { Link, useLocation } from 'react-router-dom';

const AccountNav = () => {
  const location = useLocation();
  //   console.log(location);
  let subpage = location.pathname.split('/')?.[2];
  //   console.log(subpage);

  if (subpage === undefined) {
    subpage = 'profile';
  }

  const linkClases = (type) => {
    let clss =
      ' inline-flex items-center gap-1 py-1 px-3 bg-gray-200 text-white rounded-full';
    if (type === subpage) {
      clss = clss.replace('bg-gray-200', 'bg-pink-500');
    } else {
      clss = clss.replace('text-white', 'text-dark');
    }
    return clss;
  };
  return (
    <>
      <nav className="w-full mb-4 flex gap-10 my-4 justify-center items-center">
        <Link to={'/account'} className={linkClases('profile')}>
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
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          My Profile
        </Link>
        <Link to={'/account/bookings'} className={linkClases('bookings')}>
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
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
            />
          </svg>
          My Bookings
        </Link>
        <Link
          to={'/account/accommodations'}
          className={linkClases('accommodations')}
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
              d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
            />
          </svg>
          My Accommodations
        </Link>
      </nav>
    </>
  );
};

export default AccountNav;
