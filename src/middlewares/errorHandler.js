import { ExternalServiceError, RequestError, NotFoundError } from "../errors";

export function errorHandler(err, req, res, next) {
	if (err instanceof ExternalServiceError) {
		// Log error
		res.status(429).send({ message: err.message || "Something went wrong" });
	} else if (err instanceof RequestError) {
		// Log error
		res.status(400).send({ message: err.message || "Bad request" });
	} else if (err instanceof NotFoundError) {
		// Log error
		res.status(404).send({ message: err.message || "Not found" });
	} else {
		// Log error
		// console.error(err.message);
		res.status(500).send("Something went wrong");
	}
}
