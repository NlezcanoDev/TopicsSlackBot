import { connect } from "mongoose";
import { DATABASE_URI } from "../config";

// connection to db
(async () => {
	try {
		const db = await connect(DATABASE_URI);
		console.log("-- Database " + db.connection.name + " connected --");
	} catch (error) {
		console.error(error);
	}
})();
