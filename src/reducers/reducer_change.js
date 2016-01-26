import { GET_CHANGE } from 'actions/actions_changes';

export default function (state=null, action) {

  switch (action.type) {
    case GET_CHANGE:
      return action.payload.data;
  }
  return state
}
