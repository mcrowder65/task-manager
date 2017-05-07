package src;

import java.net.UnknownHostException;
import java.util.Date;
import java.util.List;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;

import models.Reminder;

public class Mongo {
	public void connect() {
		MongoClient mongoClient;
		try {
			mongoClient = new MongoClient("localhost", 27017);
			DB db = mongoClient.getDB("list");
			DBCollection coll = db.getCollection("emails");
			Date date = new Date();

			DBObject query = new BasicDBObject("milliseconds", new BasicDBObject("$lt", date.getTime()));
			List<DBObject> obj = coll.find(query).toArray();
			System.out.println(obj);
			for (int i = 0; i < obj.size(); i++) {
				Reminder reminder = Tools.g.fromJson(obj.get(i).toString(), Reminder.class);
				coll.remove(new BasicDBObject("_id", obj.get(i).get("_id")));
				new Thread(new SendEmail(reminder)).start();
			}

		} catch (UnknownHostException e) {
			e.printStackTrace();
		}

	}

}
