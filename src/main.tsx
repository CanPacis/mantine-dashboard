import './index.css';

import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';

import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { SpotlightProvider } from '@mantine/spotlight';

import { ErrorView } from '@components/Error/ErrorView';
import { BaseLayout } from '@components/Layout/BaseLayout';
import { Loader } from '@components/Loader/Loader';
import { ForgotPasswordPage } from '@pages/Auth/ForgotPasswordPage';
import { LoginPage } from '@pages/Auth/LoginPage';
import { SignupPage } from '@pages/Auth/SignupPage';
import { CandidatesPage } from '@pages/Candidates/CandidatesPage';
import { Calendar, DashboardPage, Evaluations, Events, Overview, Tasks } from '@pages/Dashboard';
import { JobsPage } from '@pages/Jobs/JobsPage';
import { MailPage } from '@pages/Mail/MailPage';
import { ProfileSettings } from '@pages/Settings/ProfileSettings';
import { WorkspaceSettings } from '@pages/Settings/WorkspaceSettings';
import * as Api from '@utils/api';

import { store } from './stores';

const authRouter = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        path: '/dashboard',
        element: <DashboardPage />,
        children: [
          { path: '/dashboard/overview', element: <Overview /> },
          { path: '/dashboard/calendar', element: <Calendar /> },
          { path: '/dashboard/events', element: <Events /> },
          { path: '/dashboard/evaluations', element: <Evaluations /> },
          { path: '/dashboard/tasks', element: <Tasks /> },
        ],
      },
      { path: '/candidates', element: <CandidatesPage /> },
      { path: '/jobs', element: <JobsPage /> },
      { path: '/mail', element: <MailPage /> },
      { path: '/workspace-settings', element: <WorkspaceSettings /> },
      { path: '/profile-settings', element: <ProfileSettings /> },
    ],
  },
  { path: '/login', element: <Navigate to="/dashboard" replace={true} /> },
  { path: '/signup', element: <Navigate to="/dashboard" replace={true} /> },
  { path: '/forgot-password', element: <Navigate to="/dashboard" replace={true} /> },
  { path: '*', element: <ErrorView display="fill" title="404" message="Page not found" /> },
]);

const nonAuthRouter = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <SignupPage /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },
  { path: '*', element: <Navigate to="/login" replace={true} /> },
]);

function AuthGuard() {
  const { isAuthenticated, user, error, isLoading } = Api.useInit();

  if (!isAuthenticated) {
    return <RouterProvider router={nonAuthRouter} />;
  }

  if (isLoading) {
    return <Loader display="fill" />;
  }

  if (!user) {
    return <Loader display="fill" />;
  }

  if (error !== null) {
    return <ErrorView display="fill" title="Oops!" message={String(error)} />;
  }

  return <RouterProvider router={authRouter} />;
}

function StoreWrapper() {
  const [colorScheme, setColorScheme] = useLocalStorage<'light' | 'dark'>({
    key: 'colorScheme',
  });

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === 'light' ? 'dark' : 'light');
  };
  return (
    <MantineProvider
      theme={{
        colorScheme,
        fontFamily: 'Open Sans',
        headings: { fontFamily: 'Open Sans' },
      }}
      withGlobalStyles
      withNormalizeCSS>
      <SpotlightProvider actions={[]}>
        <ColorSchemeProvider toggleColorScheme={toggleColorScheme} colorScheme={colorScheme}>
          <AuthGuard />;
        </ColorSchemeProvider>
      </SpotlightProvider>
    </MantineProvider>
  );
}

let container: HTMLElement | null = null;

document.addEventListener('DOMContentLoaded', () => {
  if (!container) {
    container = document.getElementById('root') as HTMLElement;
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <Provider store={store}>
          <StoreWrapper />
        </Provider>
      </React.StrictMode>
    );
  }
});
