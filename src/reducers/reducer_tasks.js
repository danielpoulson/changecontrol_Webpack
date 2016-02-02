import { ADD_TASK, EDIT_TASK, GET_TASKS, LOAD_PAGE_TASKS, GET_PROJECT_TASKS } from 'actions/actions_tasks';

export default function(state = [], action) {
  let alldata = [];
  let _data = {};
  let per_page = 10;
  let page = 1;
  let offset = 0;
  let paged = [];
  let searchText = '';

  switch (action.type) {

    case ADD_TASK:
      _data =  action.payload;
      return [
        ...state,
        _data
      ];

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
      return {
        paged: paged,
        alldata : alldata
      };

    case GET_PROJECT_TASKS:
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

    case GET_TASKS:
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

      case LOAD_PAGE_TASKS:
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

  }

  return state;
}


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
