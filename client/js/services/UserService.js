class UserService {
  constructor($http) {
    this.$http = $http;
  }

  async getLoggedInUser() {
    try {
      const response = await this.$http({
        method: 'POST',
        url: '/getById',
        data: {
          token: localStorage.token
        }
      });
      return response.data;
    } catch(error) {
      console.error(error);
    }
  }

  async login(username, password) {
    const response = await this.$http({
      method: 'POST',
      url: '/login',
      data: {
        username,
        password
      }
    });
    return response.data;
  }
}

angular.module('userService', []).service('UserService', ['$http', UserService]);
