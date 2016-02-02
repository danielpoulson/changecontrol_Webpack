import axios from 'axios';

export const GET_TASKS = 'GET_TASKS';
export const GET_TASK = 'GET_TASK';
export const ADD_TASK = 'ADD_TASK';
export const EDIT_TASK = 'EDIT_TASK';
export const LOAD_PAGE_TASKS = 'LOAD_PAGE_TASKS';
export const GET_PROJECT_TASKS = 'GET_PROJECT_TASKS';


export function getTasks(data) {
  const url = `/api/tasks/${data}`;
  const request = axios.get(url);

  return {
    type: GET_TASKS,
    payload: request
  }

}

// /api/project/tasks/:id

export function getProjectTasks(data) {
  const url = `/api/project/tasks/${data}`;
  const request = axios.get(url);
  
  return {
    type: GET_PROJECT_TASKS,
    payload: request
  }

}

export function getTask(data) {

    const url = `/api/task/${data}`;
    const request = axios.get(url);


  return {
    type: GET_TASK,
    payload: request
  }

}

export function addTask(data) {
  const url = `/api/tasks`;
  const request = axios.post(url, data);

  return {
    type: ADD_TASK,
    payload: request
  }

}

export function editTask(data) {
  const url = `/api/task/${data._id}`;
  const request = axios.put(url, data);

  return {
    type: EDIT_TASK,
    payload: data
  }

}


export function loadPage(data) {
  return {

    type: LOAD_PAGE_TASKS,
    data
  }

}
