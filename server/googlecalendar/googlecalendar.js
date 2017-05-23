

var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var userDAO = require('../dao/userDAO');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/calendar-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/calendar'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';



/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
const authorize = (credentials, callback, dateTime, body, title, eid) => {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
  // Check if we have previously stored a token.
  return new Promise( async (resolve, reject) => {
    return await fs.readFile(TOKEN_PATH, async (err, token) => {
      if (err) {
        reject(getNewToken(oauth2Client, callback));
      } else {
        oauth2Client.credentials = JSON.parse(token);
        resolve(callback(oauth2Client, dateTime, body, title, eid));
      }
    });
  });

}

function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}


const update = (auth, dateTime, body, title, eventId) => {
  var event = {
   "end": {
    dateTime
   },
   "start": {
    dateTime
   },
   "description": body,
   "summary": title,
  };
  var calendar = google.calendar('v3');
  calendar.events.update({
    eventId,
    auth,
    calendarId: 'primary',
    resource: event,
  }, (err, event) => {
    if (err) {
      console.log('There was an error contacting the Calendar service: ' + err);
      return;
    }
    console.log('Event updated: %s', event.htmlLink);
  });

}

const create = (auth, dateTime, body, title, eventId) => {
  var event = {
    "end": {
      dateTime
    },
    "start": {
      dateTime
    },
    "description": body,
    "summary": title
  };
  var calendar = google.calendar('v3');

  return new Promise( async (resolve, reject) => {
    await calendar.events.insert({
      auth,
      calendarId: 'primary',
      resource: event
    }, async (err, event) => {
      if(err) {
        reject(err);
      } else {
        resolve(event)
      }
    });
  });
}

const createOrUpdate = async (title, time, body, eid, userID) => {
  const user = await userDAO.getById(userID);
  const clientSecret = user.clientSecret;

  if(eid) {
    // update
    const event = await authorize(JSON.parse(clientSecret), update, new Date(time).toISOString(), body, title, eid);
    return eid;
  } else {
    // create
    const event = await authorize(JSON.parse(clientSecret), create, new Date(time).toISOString(), body, title, null);
    return event.id;
  }
};

const removeEvent = async (auth, dateTime, body, title, eventId) => {
  var calendar = google.calendar('v3');
  calendar.events.delete({
    eventId,
    auth,
    calendarId: 'primary'
  }, (err, event) => {
    if (err) {
      console.log('There was an error contacting the Calendar service: ' + err);
      return;
    }
  });
}

const remove = async (eid, userId) => {
  const user = await userDAO.getById(userId);
  const clientSecret = user.clientSecret;

  await authorize(JSON.parse(clientSecret), removeEvent, null, null, null, eid);
}
module.exports = {
  createOrUpdate,
  remove
};
