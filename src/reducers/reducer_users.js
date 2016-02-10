import { GET_USERS } from 'actions/actions_users';


export default function (state = [], action) {

  switch (action.type) {
    case GET_USERS:
      return action.payload.data
  }
  return state
}
