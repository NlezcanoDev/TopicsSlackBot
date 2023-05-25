import { connect } from "mongoose";
import { DATABASE_URI } from "../config";

// connection to db
(async () => {
	try {
		const db = await connect(DATABASE_URI);
		console.log("Db connectect to", db.connection.name);
	} catch (error) {
		console.error(error);
	}
})();
