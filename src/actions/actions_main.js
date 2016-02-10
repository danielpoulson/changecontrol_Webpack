export const SET_MAIN = 'SET_MAIN';
export const SET_USER = 'SET_USER';
export const SET_FILETAB_COUNT = 'SET_FILETAB_COUNT';
export const SET_LOADING = 'SET_LOADING';

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

export function setLoading(data) {

  return {
    type: SET_LOADING,
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
