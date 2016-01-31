import { GET_CHANGES, EDIT_CHANGE, LOAD_PAGE } from 'actions/actions_changes';

export default function(state = [], action) {
  switch (action.type) {
    case GET_CHANGES:
      return action.payload.data;

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

    case LOAD_PAGE:
    // this.props.loadPage(page_num, this.state.numPage, search);
      let per_page = action.data.per_page || 10;
      let page = action.data.page || 1;
      let offset = (page - 1) * per_page;
      let paginatedItems = state.slice(offset, offset + per_page);

      return {
        page: page,
        per_page: per_page,
        total: state.length,
        total_pages: Math.ceil(state.length / per_page),
        data: paginatedItems
      };

  }

  return state;
}
