import { connect } from "mongoose";
import { DATABASE_URI } from "../config";
import Log from "../models/Log";

connect(DATABASE_URI)
	.then((db) => console.log("-- Database " + db.connection.name + " connected --"))
	.catch((e) => console.error(e));

export const createLog = async (e) => {
	try {
		await Log.create({
			instance: e.name,
			message: e.message,
			stackTrace: e.stack,
		});
	} catch {
		console.error("Error en creación log");
	}
};
