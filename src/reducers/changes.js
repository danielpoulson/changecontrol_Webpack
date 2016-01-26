import { GET_CHANGES } from 'actions/actions_changes';

export default function(state = [], action) {
  switch (action.type) {
    case GET_CHANGES:
      return action.payload.data;
  }

  return state;
}
