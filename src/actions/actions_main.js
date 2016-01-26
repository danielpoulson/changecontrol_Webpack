export const SET_MAIN = 'SET_MAIN';

export function setMain(data) {
  console.log("Set Main");
  console.log(data);

  return {
    type: SET_MAIN,
    data
  }

}
