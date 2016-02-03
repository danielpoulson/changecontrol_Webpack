export const SET_MAIN = 'SET_MAIN';
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
