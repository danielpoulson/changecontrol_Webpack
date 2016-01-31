import { GET_CHANGES, EDIT_CHANGE, LOAD_PAGE_CHANGES } from 'actions/actions_changes';

export default function(state = [], action) {
  let alldata = [];
  let per_page = 10;
  let page = 1;
  let offset = 0;
  let paged = [];

  switch (action.type) {

    case EDIT_CHANGE:
      const _data =  action.payload;
      const currIds = state.map(function (c) { return c._id; });
      const index = currIds.indexOf(_data._id);
      console.log(`Index = ${index}`);
      return [
        ...state.slice(0, index),
        // Copy the object before mutating
        Object.assign({}, _data),
        ...state.slice(index + 1)
      ];

    case GET_CHANGES:
    // this.props.loadPage(page_num, this.state.numPage, search);
      alldata = action.payload.data;
      per_page = 10;
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
        per_page = 10;
        page = action.data || 1;
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

  }

  return state;
}
