import * as React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { AppShell } from '@mantine/core';

import { Header } from '@components/Navigation/Header';
import { Navbar } from '@components/Navigation/Navbar';

export function BaseLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (location.pathname === '/') {
      navigate('/dashboard');
    }
  }, [location.pathname, navigate]);

  return (
    <AppShell
      padding={0}
      navbar={<Navbar />}
      header={<Header />}
      styles={theme => ({
        main: {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        },
      })}>
      <Outlet />
    </AppShell>
  );
}
