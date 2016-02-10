import axios from 'axios';

export const GET_FILES = 'GET_FILES';
// export const GET_CHANGE = 'GET_CHANGE';
export const ADD_FILE = 'ADD_FILE';
export const BOOKOUT_FILE = 'BOOKOUT_FILE';
export const DELETE_FILE = 'DELETE_FILE';
// export const LOAD_PAGE_CHANGES = 'LOAD_PAGE_CHANGES';


export function getFiles(data) {
  const url = `/api/files/${data}`;
  const request = axios.get(url);

  return {
    type: GET_FILES,
    payload: request
  }

}

// export function getChange(data) {
//
//     const url = `/api/change/${data}`;
//     const request = axios.get(url);
//
//
//   return {
//     type: GET_CHANGE,
//     payload: request
//   }
//
// }
//
export function addFile(data) {

  return {
    type: ADD_FILE,
    payload: data
  }

}

export function deleteFile(id) {
  const url = `/server/delete/${id}`;
  const request = axios.delete(url);

  return {
    type: DELETE_FILE,
    payload: id
  }

}
//
export function bookoutFile(id) {
  const url = `/api/filebooked/${id}`;
  const request = axios.put(url);

  return {
    type: BOOKOUT_FILE,
    payload: id
  }

}
//
//
// export function loadPage(data) {
//   return {
//
//     type: LOAD_PAGE_CHANGES,
//     data
//   }
//
// }
