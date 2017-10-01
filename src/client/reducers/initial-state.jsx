const initialState = {
    isDrawerOpen: false,
    fetchCount: 0,
    user: {
        id: ""
    },
    forms: {
      login: {
        username: "",
        usernameError: "",
        password: "",
        passwordError: ""
      }
    }
};
export default initialState;
