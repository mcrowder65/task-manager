package src;

public class Reminder {
	private Id _id;
	private String senderEmail;
	private String senderPassword;
	private String receiverEmail;
	private TimeToSend timeToSend;
	private String subject;
	private String userID;
	private String dateToSend;
	private long milliseconds;
	private String timeOfDay;
	private String emailBody;

	public Reminder(Id _id, String senderEmail, String senderPassword, String receiverEmail, TimeToSend timeToSend,
			String subject, String userID, String dateToSend, long milliseconds, String timeOfDay, String emailBody,
			boolean hidden) {
		super();
		this._id = _id;
		this.senderEmail = senderEmail;
		this.senderPassword = senderPassword;
		this.receiverEmail = receiverEmail;
		this.timeToSend = timeToSend;
		this.subject = subject;
		this.userID = userID;
		this.dateToSend = dateToSend;
		this.milliseconds = milliseconds;
		this.timeOfDay = timeOfDay;
		this.emailBody = emailBody;
		this.hidden = hidden;
	}

	public String getEmailBody() {
		return emailBody;
	}

	public void setEmailBody(String emailBody) {
		this.emailBody = emailBody;
	}

	private boolean hidden;

	public String toJson() {
		return Tools.g.toJson(this);
	}

	@Override
	public String toString() {
		return toJson();
	}

	public String fromJson(String json) {
		return Tools.g.fromJson(json, this.getClass());
	}

	public Reminder(Id _id, String senderEmail, String senderPassword, String receiverEmail, TimeToSend timeToSend,
			String subject, String userID, String dateToSend, long milliseconds, String timeOfDay, boolean hidden) {
		super();
		this._id = _id;
		this.senderEmail = senderEmail;
		this.senderPassword = senderPassword;
		this.receiverEmail = receiverEmail;
		this.timeToSend = timeToSend;
		this.subject = subject;
		this.userID = userID;
		this.dateToSend = dateToSend;
		this.milliseconds = milliseconds;
		this.timeOfDay = timeOfDay;
		this.hidden = hidden;
	}

	public Id get_id() {
		return _id;
	}

	public void set_id(Id _id) {
		this._id = _id;
	}

	public String getSenderEmail() {
		return senderEmail;
	}

	public void setSenderEmail(String senderEmail) {
		this.senderEmail = senderEmail;
	}

	public String getSenderPassword() {
		return senderPassword;
	}

	public void setSenderPassword(String senderPassword) {
		this.senderPassword = senderPassword;
	}

	public String getReceiverEmail() {
		return receiverEmail;
	}

	public void setReceiverEmail(String receiverEmail) {
		this.receiverEmail = receiverEmail;
	}

	public TimeToSend getTimeToSend() {
		return timeToSend;
	}

	public void setTimeToSend(TimeToSend timeToSend) {
		this.timeToSend = timeToSend;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	public String getDateToSend() {
		return dateToSend;
	}

	public void setDateToSend(String dateToSend) {
		this.dateToSend = dateToSend;
	}

	public long getMilliseconds() {
		return milliseconds;
	}

	public void setMilliseconds(long milliseconds) {
		this.milliseconds = milliseconds;
	}

	public String getTimeOfDay() {
		return timeOfDay;
	}

	public void setTimeOfDay(String timeOfDay) {
		this.timeOfDay = timeOfDay;
	}

	public boolean isHidden() {
		return hidden;
	}

	public void setHidden(boolean hidden) {
		this.hidden = hidden;
	}
}
