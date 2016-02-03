import { GET_FILES } from 'actions/actions_files';

export default function (state=[], action) {

  switch (action.type) {
    case GET_FILES:
      if(!action.payload.data){
        return state=[];
      }
      return action.payload.data;
  }
  return state
}
