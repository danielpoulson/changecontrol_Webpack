export const SET_MAIN = 'SET_MAIN';
export const SET_USER = 'SET_USER';
export const SET_FILETAB_COUNT = 'SET_FILETAB_COUNT';

export function setMain(data) {

  return {
    type: SET_MAIN,
    data
  }
}

export function setFiletabCount(data) {

  return {
    type: SET_FILETAB_COUNT,
    data
  }
}

export function setUser(data) {
  const user = {
    userName : data.username,
    fullname : data.fullname,
    role : data.role
  }

  return {
    type: SET_USER,
    user
  }
}
