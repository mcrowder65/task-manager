class RealTimeService {
  constructor($http) {
    this.$http = $http;
  }

  async pushDaddy() {
    const response = await this.$http({
      method: 'POST',
      url: '/items'
    });
    console.log('response ', response);
    return response.data;
  }

}

angular.module('realTimeService', []).service('RealTimeService', ['$http', RealTimeService]);
