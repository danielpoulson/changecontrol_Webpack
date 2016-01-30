import { GET_CHANGES, EDIT_CHANGE } from 'actions/actions_changes';

export default function(state = null, action) {
  switch (action.type) {
    case GET_CHANGES:
      return action.payload.data;

    case EDIT_CHANGE:
      const _data =  action.payload;
    // TODO: Update the EDIT_CHANGE reducer
      // console.log("Reducer Change");
      // console.log("state");
      // console.log(...state);
      // console.log("data");
      // console.log(_data);
      const currIds = state.map(function (c) { return c._id; });
      const index = currIds.indexOf(_data._id);
      console.log(`Index = ${index}`);
      return [
        ...state.slice(0, index),
        // Copy the object before mutating
        Object.assign({}, _data),
        ...state.slice(index + 1)
        ]
  }

  return state;
}
