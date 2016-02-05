import { GET_CHANGES, ADD_CHANGE, EDIT_CHANGE, LOAD_PAGE_CHANGES, CREATE_LOG } from 'actions/actions_changes';

export default function(state = [], action) {
  let alldata = [];
  let _data = {};
  let per_page = 10;
  let page = 1;
  let offset = 0;
  let paged = [];
  let searchText = '';
  let currIds = [];
  let index = [];

  switch (action.type) {

    case ADD_CHANGE:
      _data =  action.payload;
      return [
        ...state,
        _data
      ];

    case EDIT_CHANGE:
      _data =  action.payload;
      currIds = state.alldata.map(function (c) { return c._id; });
      index = currIds.indexOf(_data._id);
      alldata = [
        ...state.alldata.slice(0, index),
        // Copy the object before mutating
        Object.assign({}, _data),
        ...state.alldata.slice(index + 1)
      ];
      return {
        paged: paged,
        alldata : alldata
      };

    case GET_CHANGES:
    // this.props.loadPage(page_num, this.state.numPage, search);
      alldata = action.payload.data;
      per_page = 15;
      page = 1;
      offset = (page - 1) * per_page;
      paged = alldata.slice(offset, offset + per_page);

      return {
        page: page,
        per_page: per_page,
        total: alldata.length,
        total_pages: Math.ceil(alldata.length / per_page),
        paged: paged,
        alldata : alldata
      };

      case LOAD_PAGE_CHANGES:
      // this.props.loadPage(page_num, this.state.numPage, search);
        alldata = state.alldata;
        per_page = action.data.numPage;
        page = action.data.page_num || 1;
        offset = (page - 1) * per_page;
        searchText = action.data.search;
        let searcheddata = searchData(state.alldata, searchText);
        paged = searcheddata.slice(offset, offset + per_page);

        console.log(searchText);
        return {
          page: page,
          per_page: per_page,
          total: searcheddata.length,
          total_pages: Math.ceil(alldata.length / per_page),
          paged: paged,
          alldata : alldata
        };

        case CREATE_LOG:
          return state;

          // return {
          //   ...state,
          //   alldata : state.alldata.map(c =>
          //   addLog(c, action))
          // }

  }

  return state;
}

// const addLog = (state, action) => {
//   switch (action.type) {
//     case 'CREATE_LOG':
//       if (state.CC_No !== action.payload.CC_No) {
//         return state
//       }
//
//       let _addLog = state.CC_LOG;
//       let logObj = { CC_ActBy: action.payload.CC_ActBy,
//           CC_ActDate: action.payload.CC_ActDate,
//           CC_Action: action.payload.CC_Action
//         };
//
//       _addLog.push(logObj);
//
//       return {
//         ...state,
//         CC_LOG : _addLog
//       }
//     default:
//       return state
//   }
// }


function searchData(data, searchText){
    var searched = [];

    function search(item){

        var reg1 = new RegExp(searchText + ".*", "i")


        if(item.CC_No.match(reg1) || item.CC_Descpt.match(reg1) || item.CC_Champ.match(reg1)){
          return true
        } else {
          return false
        }

    }


    if (searchText == null) {
        return data;
    } else {
        return data.filter(search);
    }

}
