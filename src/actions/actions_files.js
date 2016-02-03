import axios from 'axios';

export const GET_FILES = 'GET_FILES';
// export const GET_CHANGE = 'GET_CHANGE';
// export const ADD_CHANGE = 'ADD_CHANGE';
// export const EDIT_CHANGE = 'EDIT_CHANGE';
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
// export function addChange(data) {
//   const url = `/api/changes`;
//   const request = axios.post(url, data);
//
//   return {
//     type: ADD_CHANGE,
//     payload: request
//   }
//
// }
//
// export function editChange(data) {
//   const url = `/api/change/${data._id}`;
//   const request = axios.put(url, data);
//
//   return {
//     type: EDIT_CHANGE,
//     payload: data
//   }
//
// }
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
