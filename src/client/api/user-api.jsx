import {fetchPost} from "../shared/shared-fetch";
const UserApi = {
  login: async (username, password) => {
    return fetchPost({
      url: "http://matthewjcrowder.com:80/login",
      body: JSON.stringify({username, password})
    });
  }
};

export default UserApi;
