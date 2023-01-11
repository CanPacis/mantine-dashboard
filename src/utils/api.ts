import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { constants } from '@config/constants';
import { RootState } from '@stores/index';
import { User, login } from '@stores/userStore';

import Cookies from 'js-cookie';

// eslint-disable-next-line no-undef
type FetchRequestInit = RequestInit;

export function useInit() {
  const user = useSelector((state: RootState) => state.user);
  const { init, data, error, isLoading } = useFetch<User>();
  const dispatch = useDispatch();

  const [accessToken, setAccessToken] = React.useState(Cookies.get('accessToken'));
  // const refreshToken = Cookies.get("refreshToken");
  // const tokenExpire = Cookies.get("tokenExpire");
  const isAuthenticated = Boolean(accessToken);

  React.useEffect(() => {
    if (user) {
      Cookies.set('accessToken', user.accessToken);
      setAccessToken(user.accessToken);
    } else {
      if (!Cookies.get('accessToken')) {
        setAccessToken(undefined);
      }
    }
  }, [user]);

  React.useEffect(() => {
    if (data) {
      dispatch(login(data));
    }
  }, [data]);

  React.useEffect(() => {
    if (isAuthenticated) {
      init(`${constants.apiUrl}/users/3`);
    }
  }, []);

  return { isAuthenticated, user, error, isLoading };
}

export interface UseFetchHook<T> {
  init: (url: string, init?: FetchRequestInit) => Promise<void>;
  isLoading: boolean;
  data: T | null;
  error: unknown;
}

export function useFetch<T extends object>(): UseFetchHook<T> {
  const accessToken = Cookies.get('accessToken');
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState<T | null>(null);
  const [error, setError] = React.useState<unknown>(null);

  const init = async (url: string, init?: FetchRequestInit): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await window.fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ...init?.headers,
        },
        ...init,
      });
      const json = await response.json();
      setData(json);
    } catch (error) {
      setError(error);
      console.error(`API Call Failed:\n`, error);
    }

    setIsLoading(false);
  };

  return { init, data, error, isLoading };
}
