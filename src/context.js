import React, { useContext, useEffect, useReducer } from "react";

import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
  TOGGLE_MODE,
} from "./actions";
import reducer from "./reducer";

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?";

const getStorageTheme = () => {
  let theme = "light-theme";
  let darkMode = false;
  if (localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme");
  }
  if (theme === "dark-theme") {
    darkMode = true;
  }
  return darkMode;
};

const initialState = {
  isLoading: true,
  query: "react",
  hits: [],
  page: 0,
  nbPages: 0,
  darkMode: getStorageTheme(),
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const removeStory = (id) => {
    dispatch({ type: REMOVE_STORY, payload: { id } });
  };

  const handleSearch = (query) => {
    dispatch({ type: HANDLE_SEARCH, payload: query });
  };

  const handlePage = (value) => {
    dispatch({ type: HANDLE_PAGE, payload: value });
  };

  const handleMode = () => {
    dispatch({ type: TOGGLE_MODE });
  };

  const fetchStories = async (url) => {
    dispatch({ type: "SET_LOADING" });
    const response = await fetch(url);
    const data = await response.json();
    dispatch({
      type: SET_STORIES,
      payload: { hits: data.hits, nbPages: data.nbPages },
    });
  };

  useEffect(() => {
    fetchStories(`${API_ENDPOINT}query=${state.query}`);
    if (state.darkMode) {
      document.documentElement.className = "dark-theme";
      localStorage.setItem("theme", "dark-theme");
    } else {
      {
        document.documentElement.className = "light-theme";
        localStorage.setItem("theme", "light-theme");
      }
    }
  }, [state.query, state.page, state.darkMode]);

  return (
    <AppContext.Provider
      value={{ ...state, removeStory, handleSearch, handlePage, handleMode }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
