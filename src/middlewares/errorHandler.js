import { ExternalServiceError, RequestError, NotFoundError } from "../errors";

export function errorHandler(err, req, res, next) {
	let code, message;
	if (err instanceof ExternalServiceError) {
		// Log error
		code = 429;
		message = err.message || "Oops! Algo salió mal";
	} else if (err instanceof RequestError) {
		// Log error
		code = 400;
		message = err.message || "Creo que lo que me pedís no puede ser";
	} else if (err instanceof NotFoundError) {
		// Log error
		code = 404;
		message = err.message || "Algo nos está faltando o no lo estamos encontrando";
	} else {
		// Log error
		code = 500;
		message = err.message || "Houston! Tenemos un problema. Probá mas tarde";
	}

	res.status(code).json({
		response_type: "ephemeral",
		text: message,
	});
}
