import { SET_MAIN } from 'actions/actions_main';
const initialState = {
    MainId : 'CC150023',
    MainTitle : 'Storm Rodenticide',
    CurrentMode: 'change'
}

export default function (state, action) {
  if (typeof state === 'undefined') {
      return initialState
  }

  switch (action.type) {
    case SET_MAIN:
      return {
        MainId : action.data.MainId,
        MainTitle : action.data.MainTitle,
        CurrentMode: action.data.CurrentMode
      }
  }
  return state
}
