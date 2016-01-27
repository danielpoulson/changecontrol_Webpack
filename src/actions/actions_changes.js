import axios from 'axios';

export const GET_CHANGES = 'GET_CHANGES';
export const GET_CHANGE = 'GET_CHANGE';
export const EDIT_CHANGE = 'EDIT_CHANGE';

export function getChanges(data) {
  const url = `/api/changes/${data}`;
  const request = axios.get(url);

  return {
    type: GET_CHANGES,
    payload: request
  }

}

export function getChange(data) {
  const url = `/api/change/${data}`;
  const request = axios.get(url);

  return {
    type: GET_CHANGE,
    payload: request
  }

}

// TODO: Create an action Creator
// TODO: Sent data to the server PUT /api/change/:id
// TODO: Update the EDIT_CHANGE reducer
