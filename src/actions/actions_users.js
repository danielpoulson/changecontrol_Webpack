import axios from 'axios';

export const GET_USERS = 'GET_USERS';


export function getUsers() {
  const url = `/api/allusers`;
  const request = axios.get(url);

  return {
    type: GET_USERS,
    payload: request
  }

}
