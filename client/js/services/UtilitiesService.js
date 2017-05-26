class UtilitiesService {
  constructor() {
  }
  get(parameter) {
    var url = window.location.href;
    var index = url.indexOf(parameter);
    if(index == -1)
      return null;
    index += parameter.length + 1; //if the word we're looking for is address, get a index
    //then add address.length +1 to get start of value

    var i = index;
    while(url[i] != '?' && url[i] != '&') {
      if(i > url.length)
        break;
      i++;
    }
    return url.substring(index, i);
  }

  removeGet(parameter, dateToSend) {
    var url = window.location.href;
    var index = url.indexOf(parameter);
    if(index == -1)
      return null;

    var i = index + parameter.length + 1;
    while(url[i] != '?' && url[i] != '&') {
      if(i > url.length)
        break;
      i++;
    }
    window.location.href = String(window.location.href).replace(url.substring(index, i), "") + 'date=' + dateToSend;
  }

}

angular.module('utilitiesService', []).service('UtilitiesService', ['$http', UtilitiesService]);
