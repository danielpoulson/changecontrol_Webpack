import { SET_MAIN, SET_USER, USER_LOGGED_OUT, SET_FILETAB_COUNT, SET_LOADING, SET_USER_DASHBOARD} from 'actions/actions_main';
const initialState = {
  MainId: '',
  CurrentMode: 'change',
  user: {
    username: '',
    fullname: '',
    role: 'user'
  }
};

export default function (state, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }

  switch (action.type) {
    case SET_MAIN:
      return {
        ...state,
        MainId: action.data.MainId,
        CurrentMode: action.data.CurrentMode,
        loading: action.data.loading
      };

    case SET_USER: {
      const _user = action.payload.data.success ? action.payload.data.user : {};

      return {
        ...state,
        user: _user
      };
    }

    case USER_LOGGED_OUT:
      return {
        ...state,
        user: initialState.user,
      };

    case SET_FILETAB_COUNT:
      return {
        ...state,
        fileTabCount: action.data
      };

    case SET_LOADING:
      return {
        ...state,
        loading: action.data.loading
      };

    case SET_USER_DASHBOARD:
      const countChangesUser = action.payload.data ? action.payload.data.changeCount : 0;
      const countTasksUser = action.payload.data ? action.payload.data.taskCount : 0;
      const allOpenTasks = action.payload.data ? action.payload.data.allTaskCount : 0;
      const allOpenChanges = action.payload.data ? action.payload.data.allChangeCount : 0;
      return {
        ...state,
        countChangesUser,
        countTasksUser,
        allOpenTasks,
        allOpenChanges
      }

    default:
      return state;
  }
}
