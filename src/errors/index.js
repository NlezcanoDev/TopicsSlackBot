import { createLog } from "../utils/db";

export class ServerError extends Error {
	constructor(message) {
		super(message);
		this.name = "ServerError";
		Error.captureStackTrace(this, this.constructor);

		createLog(this);
	}
}

export class RequestError extends Error {
	constructor(message) {
		super(message);
		this.name = "RequestError";
		Error.captureStackTrace(this, this.constructor);

		createLog(this);
	}
}

export class ExternalServiceError extends Error {
	constructor(message) {
		super(message);
		this.name = "ExternalServiceError";
		Error.captureStackTrace(this, this.constructor);

		createLog(this);
	}
}

export class NotFoundError extends Error {
	constructor(message) {
		super(message);
		this.name = "NotFoundError";
		Error.captureStackTrace(this, this.constructor);

		createLog(this);
	}
}
