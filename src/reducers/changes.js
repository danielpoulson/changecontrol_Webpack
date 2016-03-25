import { GET_CHANGES, ADD_CHANGE, EDIT_CHANGE, LOAD_PAGE_CHANGES, SORT_BY_CHANGES } from 'actions/actions_changes';
import _ from 'lodash';

const initialState = {
    alldata : [],
    paged : []
}

export default function(state, action) {
  let alldata = [];
  let _data = {};
  let per_page = 10;
  let page = 1;
  let offset = 0;
  let paged = [];
  let searchText = '';
  let currIds = [];
  let index = [];

  if (typeof state === 'undefined') {
      return initialState
  }

  switch (action.type) {

    case ADD_CHANGE:
      _data =  action.payload.data;
      alldata = [
        ...state.alldata,
        _data
      ];
      return {
        ...state,
        alldata
      };

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

      case SORT_BY_CHANGES:

        alldata = dataSort(state.alldata, action.col);
        page = 1;
        offset = (page - 1) * state.per_page;
        paged = alldata.slice(offset, offset + state.per_page);

        return {
          ...state,
          alldata,
          paged,
          page
        }

      case LOAD_PAGE_CHANGES:
        alldata = state.alldata;
        per_page = action.data.numPage;
        page = action.data.page_num || 1;
        offset = (page - 1) * per_page;
        searchText = action.data.search;
        let searcheddata = searchData(state.alldata, searchText);
        paged = searcheddata.slice(offset, offset + per_page);

        return {
          searchText: searchText,
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


function dataSort(data, sortColumn){
  return _.sortBy(data, sortColumn);
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
