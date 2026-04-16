import { Outlet } from 'react-router-dom';
import Header from './Header';
import { FC } from 'react';

const Layout: FC = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;


