import {SET_IS_DRAWER_OPEN, ADD_FETCHING, MINUS_FETCHING} from "./action-types";

export const setIsDrawerOpen = isDrawerOpen => {
    return {
        type: SET_IS_DRAWER_OPEN,
        isDrawerOpen: !!isDrawerOpen
    };
};

export const addFetching = () => {
  return {
    type: ADD_FETCHING
  };
};

export const minusFetching = () => {
  return {
    type: MINUS_FETCHING
  };
};
