package src;

import com.google.gson.annotations.SerializedName;

public class TimeToSend {
	@SerializedName("$date")
	private String date;

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public TimeToSend(String date) {
		super();
		this.date = date;
	}

}
