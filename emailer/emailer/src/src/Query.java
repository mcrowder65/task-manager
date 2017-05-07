package src;

import java.util.Map;
import java.util.Set;

import org.bson.BSONObject;

import com.google.gson.annotations.SerializedName;
import com.mongodb.DBObject;

public class Query implements DBObject {
	private Gt milliseconds;

	public Query(Gt milliseconds) {
		super();
		this.milliseconds = milliseconds;
	}

	public Query(int i) {
		this.milliseconds = new Gt(i);
	}

	public Gt getMilliseconds() {
		return milliseconds;
	}

	public void setMilliseconds(Gt milliseconds) {
		this.milliseconds = milliseconds;
	}

	class Gt {
		@SerializedName("$gt")
		private int gt;

		public int getGt() {
			return gt;
		}

		public void setGt(int gt) {
			this.gt = gt;
		}

		public Gt(int gt) {
			super();
			this.gt = gt;
		}

	}

	@Override
	public boolean containsField(String s) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean containsKey(String s) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public Object get(String key) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Set<String> keySet() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Object put(String key, Object v) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void putAll(BSONObject o) {
		// TODO Auto-generated method stub

	}

	@Override
	public void putAll(Map m) {
		// TODO Auto-generated method stub

	}

	@Override
	public Object removeField(String key) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Map toMap() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean isPartialObject() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void markAsPartialObject() {
		// TODO Auto-generated method stub

	}

}
