package src;

import java.util.Date;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.MimeMessage;

import models.Reminder;

public class SendEmail implements Runnable {

	private Reminder reminder;

	public SendEmail(Reminder reminder) {
		this.reminder = reminder;
	}

	@Override
	public void run() {
		sendEmail(this.reminder);
	}

	private void sendEmail(Reminder reminder) {
		try {
			String username = reminder.getSenderEmail();
			String password = reminder.getSenderPassword();
			String recipient = reminder.getReceiverEmail();

			Properties props = new Properties();

			props.put("mail.smtp.host", "smtp.gmail.com");
			props.put("mail.from", reminder.getSenderEmail());
			props.put("mail.smtp.starttls.enable", "true");
			props.put("mail.smtp.port", "587");
			props.setProperty("mail.debug", "true");

			Session session = Session.getInstance(props, null);
			MimeMessage msg = new MimeMessage(session);
			msg.setRecipients(Message.RecipientType.TO, recipient);
			msg.setSubject(reminder.getSubject());
			msg.setSentDate(new Date());
			msg.setText(reminder.getEmailBody() != null ? reminder.getEmailBody() : "");

			Transport transport = session.getTransport("smtp");

			transport.connect(username, password);
			transport.sendMessage(msg, msg.getAllRecipients());
			transport.close();
		} catch (MessagingException e) {
			e.printStackTrace();
		}

	}

}