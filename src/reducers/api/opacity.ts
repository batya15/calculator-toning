import {handleActions} from 'redux-actions';
import {Api} from "api";
import {ACTIONS} from "constants/actions";

export default handleActions<Api.IOpacity[]>({
	[ACTIONS.API_NEED_OPACITY]: (old, data): Api.IOpacity[] => {
		return data.payload;
	}
}, []);
