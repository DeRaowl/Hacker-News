import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: true };
    case SET_STORIES:
      return {
        ...state,
        isLoading: false,
        hits: action.payload.hits,
        nbPages: action.payload.nbPages,
      };

    case REMOVE_STORY:
      return {
        ...state,
        hits: state.hits.filter((story) => {
          return story.objectID !== action.payload.id;
        }),
      };

    case HANDLE_SEARCH:
      return {
        ...state,
        query: action.payload,
        page: 0,
      };

    case HANDLE_PAGE:
      if (action.payload === "inc") {
        let nextValue = state.page + 1;
        if (nextValue > state.nbPages - 1) {
          nextValue = 0;
        }
        return { ...state, page: nextValue };
      } else if (action.payload === "dec") {
        let nextValue = state.page - 1;
        if (nextValue < 0) {
          nextValue = state.nbPages - 1;
        }
        return { ...state, page: nextValue };
      }

    default:
      throw new Error(`no matching ${action.type} action type`);
  }
};
export default reducer;
