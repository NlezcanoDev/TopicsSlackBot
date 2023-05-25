export class CallbackFn {
	#fn = null;

	constructor() {
		if (typeof CallbackFn.instance === "object") {
			return CallbackFn.instance;
		} else {
			CallbackFn.instance = this;
			return CallbackFn;
		}
	}

	get() {
		return this.#fn;
	}

	set(callback) {
		this.#fn = callback;
	}
}
