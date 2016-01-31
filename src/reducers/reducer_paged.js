import { LOAD_PAGE } from 'actions/actions_paged';

export default function(state = [], action) {
  switch (action.type) {
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
