import { ExternalServiceError, RequestError, NotFoundError, ServerError } from "../errors";
import { createLog } from "../utils/db";

export function errorHandler(err, req, res, next) {
	let code, message;
	if (err instanceof ExternalServiceError) {
		code = 429;
		message = err.message || "Oops! Algo salió mal";
	} else if (err instanceof RequestError) {
		code = 400;
		message = err.message || "Creo que lo que me pedís no puede ser";
	} else if (err instanceof NotFoundError) {
		code = 404;
		message = err.message || "Algo nos está faltando o no lo estamos encontrando";
	} else if (err instanceof ServerError) {
		code = 500;
		message = err.message || "Houston! Tenemos un problema. Probá mas tarde";
	} else {
		code = 500;
		message = err.message;
		createLog(err);
	}

	res.status(code).json({
		response_type: "ephemeral",
		text: message,
	});
}
