import {SET_IS_DRAWER_OPEN, ADD_FETCH_COUNT, MINUS_FETCH_COUNT} from "./action-types";

export const setIsDrawerOpen = isDrawerOpen => {
    return {
        type: SET_IS_DRAWER_OPEN,
        isDrawerOpen: !!isDrawerOpen
    };
};

export const addFetchCount = () => {
  return {
    type: ADD_FETCH_COUNT
  };
};

export const minusFetchCount = () => {
  return {
    type: MINUS_FETCH_COUNT
  };
};
