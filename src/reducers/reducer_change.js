import { GET_CHANGE, CREATE_LOG } from 'actions/actions_changes';

export default function (state=null, action) {

  switch (action.type) {
    case GET_CHANGE:
      if(!action.payload.data){
        return state=null;
      }
      return action.payload.data;

      case CREATE_LOG:
        let _addLog = state.CC_LOG;
        let randomID = Math.random() * (1000000 - 0) + 0;
        let logObj = {
            _id: randomID,
            CC_ActBy: action.payload.CC_ActBy,
            CC_ActDate: action.payload.CC_ActDate,
            CC_Action: action.payload.CC_Action
          };

        _addLog.push(logObj);
        return {
          ...state,
          CC_LOG: _addLog
        };

      }

  return state;
}
