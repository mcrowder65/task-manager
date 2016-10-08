
 
var backup = require('mongodb-backup');
 
backup({
  uri: 'uri', // mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase> 
  root: __dirname
});