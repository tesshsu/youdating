import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import * as USERS_ACTIONS from '../Redux/actions/users';

export default function useUsers() {
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  const fetchUser = useCallback(id => dispatch(USERS_ACTIONS.fetchUser(id)), [dispatch]);

  return {
    users,
    fetchUser
  };
}
