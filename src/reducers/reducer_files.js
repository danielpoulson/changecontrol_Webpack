import { GET_FILES, ADD_FILE } from 'actions/actions_files';

export default function (state=[], action) {
  let _data = [];
  switch (action.type) {
    case ADD_FILE:
      _data =  action.payload;
      return [
        ...state,
        _data
      ];

    case GET_FILES:
      if(!action.payload.data){
        return state=[];
      }
      return action.payload.data;
  }
  return state
}
