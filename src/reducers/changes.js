import { GET_CHANGES, EDIT_CHANGE } from 'actions/actions_changes';

export default function(state = [], action) {
  switch (action.type) {
    case GET_CHANGES:
      return action.payload.data;

    // TODO: Implement the EDIT_CHANGE function
  }

  return state;
}
