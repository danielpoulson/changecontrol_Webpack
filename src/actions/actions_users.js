import axios from 'axios';

export const GET_USER = 'GET_USER';
export const GET_USERS = 'GET_USERS';
export const SAVE_USER = 'SAVE_USER';


export function getUsers() {
  const url = `/api/allusers`;
  const request = axios.get(url);

  return {
    type: GET_USERS,
    payload: request
  }

}

export function getUser(id) {
  const url = `/api/user/${id}`;
  const request = axios.get(url);

  return {
    type: GET_USER,
    payload: request
  }

}

export function saveUser(data) {
  const url = `/api/updateuser/${data.username}`;
  const request = axios.put(url, data);

  return {
    type: SAVE_USER,
    data
  }

}
