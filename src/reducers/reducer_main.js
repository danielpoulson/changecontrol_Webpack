import { SET_MAIN, SET_USER, SET_FILETAB_COUNT, SET_LOADING } from 'actions/actions_main';
const initialState = {
    MainId : '',
    CurrentMode: 'change',
    user : {
      userName : '',
      fullname : '',
      role : 'user'
    }
}

export default function (state, action) {
  if (typeof state === 'undefined') {
      return initialState
  }

  switch (action.type) {
    case SET_MAIN:
      return {
        ...state,
        MainId : action.data.MainId,
        CurrentMode: action.data.CurrentMode,
        loading: action.data.loading
      }

    case SET_USER:
      return {
        ...state,
        user : action.user
      }

      case SET_FILETAB_COUNT:
        return {
          ...state,
          fileTabCount : action.data
        }

      case SET_LOADING:
        return {
          ...state,
          loading : action.data.loading
        }
  }
  return state
}
