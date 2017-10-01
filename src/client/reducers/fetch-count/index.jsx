import initialState from "../initial-state";
import {ADD_FETCH_COUNT, MINUS_FETCH_COUNT} from "../../actions/action-types";

const fetchCount = (state = initialState.fetchCount, action) => {
  switch (action.type) {
    case ADD_FETCH_COUNT: {
      return ++state;
    }
    case MINUS_FETCH_COUNT: {
      return --state;
    }
    default: return state;
  }
};

export default fetchCount;
