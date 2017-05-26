class UserDAO {
  sayHello() {
    console.log('hello');
  }
  sayGoodbye() {
    console.log('goodbye')
  }
}
angular.module('userDAO', []).service('UserDAO', UserDAO);
