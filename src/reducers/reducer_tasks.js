import { ADD_TASK, EDIT_TASK, GET_TASKS, LOAD_PAGE_TASKS, GET_PROJECT_TASKS } from 'actions/actions_tasks';

const initialState = {
    alldata : [],
    paged : []
};

export default function(state, action) {
  let alldata = [];
  let _data = {};
  let per_page = 10;
  let page = 1;
  let offset = 0;
  let paged = [];
  let searchText = '';

  if (typeof state === 'undefined') {
      return initialState
  }

  switch (action.type) {
    case ADD_TASK:
      _data =  action.payload.data;
      alldata = [
        ...state.alldata,
        _data
      ];
      return {
        ...state,
        alldata
      };

    case EDIT_TASK:
      _data =  action.payload;
      const currIds = state.alldata.map(function (c) { return c._id; });
      const index = currIds.indexOf(_data._id);
      alldata = [
        ...state.alldata.slice(0, index),
        // Copy the object before mutating
        Object.assign({}, _data),
        ...state.alldata.slice(index + 1)
      ];
      console.log(alldata);
      return {
        ...state,
        alldata : alldata
      };

    case GET_PROJECT_TASKS:
      const ctlist = action.payload.data;
      const ctTotal = ctlist.length;

      return {
        ...state,
        ctlist : ctlist,
        ctTotal : ctTotal
      };

    case GET_TASKS:
    // this.props.loadPage(page_num, this.state.numPage, search);
      alldata = action.payload.data;
      per_page = 15;
      page = 1;
      offset = (page - 1) * per_page;
      paged = alldata.slice(offset, offset + per_page);

      return {
        ...state,
        page: page,
        per_page: per_page,
        total: alldata.length,
        total_pages: Math.ceil(alldata.length / per_page),
        paged: paged,
        alldata : alldata
      };

      case LOAD_PAGE_TASKS:
      // this.props.loadPage(page_num, this.state.numPage, search);
        alldata = state.alldata;
        per_page = action.data.numPage;
        page = action.data.page_num || 1;
        offset = (page - 1) * per_page;
        searchText = action.data.search;
        let searcheddata = searchData(alldata, searchText);
        paged = searcheddata.slice(offset, offset + per_page);

        return {
          ...state,
          page: page,
          per_page: per_page,
          total: searcheddata.length,
          total_pages: Math.ceil(alldata.length / per_page),
          paged: paged,
          alldata : alldata
        };

  }

  return state;
}


function searchData(data, searchText){
    var searched = [];

    function search(item){

        var reg1 = new RegExp(searchText + ".*", "i")


        if(item.SourceId.match(reg1) || item.TKChamp.match(reg1) || item.TKName.match(reg1)){
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
