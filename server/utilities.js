var nodemailer = require('nodemailer');
var log = require('./models/log');
const sendReminder = async (reminder) => {
  return new Promise( async (resolve, reject) => {
    try {
      var receiverEmails = reminder.receiverEmail.split(",");
      for(var i = 0; i < receiverEmails.length; i++)  {
        var transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: reminder.senderEmail,
            pass: reminder.senderPassword
          }
        });

        var mailOptions = {
          from: reminder.senderEmail,
          to: receiverEmails[i],
          subject: reminder.subject,
          html: reminder.emailBody
        };

        await sendMail(transporter, mailOptions);
      }
      resolve();
    } catch(error) {
      reject(error);
    }
  });

  async function sendMail(transporter, mailOptions) {
    return new Promise( async (resolve, reject) => {
      transporter.sendMail(mailOptions, async (error, info) => {
        if(error) {
          reject(error);
        } else {
          resolve();
        }
      })
    });
  }
};

module.exports = {
  validateEmailAddress: function (email) {
  	var regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return !regex.test(email) ? false : true;
  },
  sendReminder
};
