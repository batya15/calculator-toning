import { isFSA } from 'flux-standard-action';
import {ACTIONS_TYPE} from "../constants/actions";

function isPromise(val) {
	return val && typeof val.then === 'function';
}

export default function promiseMiddleware( { dispatch } ) {
	return next => (action) => {
		if (!isFSA(action) || !isPromise(action.payload)) {
			return next(action);
		}

		const SUCCESS = action.type;
		const REQUEST = action.type.toString() + ACTIONS_TYPE.REQUEST;
		const FAILURE = action.type.toString() + ACTIONS_TYPE.FAILURE;

		action.type = REQUEST;
		next(action);

		let payload = action.payload as Promise<any>;

		return payload
			.then(
				result => dispatch({ ...action, payload: result, type: SUCCESS }),
				error =>  {
					next({ ...action, error, type: FAILURE });
					//throw new Error(JSON.stringify(error));
				}
			);
	};
}
