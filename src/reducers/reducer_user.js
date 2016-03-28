import { GET_USER, RESET_USER } from 'actions/actions_users';


export default function (state=null, action) {

  switch (action.type) {
    case GET_USER:
      return action.payload.data[0]

    case RESET_USER:
      state=null;
      return state
  }
  return state
}
