package models;

import com.google.gson.annotations.SerializedName;

public class Id {
	@SerializedName("$oid")
	private String oid;

	public String getOid() {
		return oid;
	}

	public void setOid(String oid) {
		this.oid = oid;
	}

	public Id(String oid) {
		super();
		this.oid = oid;
	}

}
