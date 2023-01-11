import { useSelector } from 'react-redux';

import { RootState } from '@stores/index';
import { User } from '@stores/userStore';

export function Overview() {
  const user = useSelector((state: RootState) => state.user) as User;

  return <div>Overview {user.name}</div>;
}
