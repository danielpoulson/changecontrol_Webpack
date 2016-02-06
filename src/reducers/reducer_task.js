import { GET_TASK } from 'actions/actions_tasks';

export default function (state=null, action) {

  switch (action.type) {
    case GET_TASK:
      if(!action.payload.data){
        return state=null;
      }
      return action.payload.data;

      }

  return state;
}
