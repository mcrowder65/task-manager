import initialState from "../initial-state";
import {LOGIN_ACTIONS_SET_FORM} from "../../actions/action-types";
const login = (state = initialState.forms.login, action) => {
  switch (action.type) {
    case LOGIN_ACTIONS_SET_FORM: {
      return {
        ...state,
        ...action,
        type: undefined
      };
    }
    default: return state;
  }
};

export default login;
