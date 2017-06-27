import {handleActions} from 'redux-actions';
import {Api} from "api";
import {ACTIONS} from "constants/actions";

export default handleActions<Api.IService[]>({
	[ACTIONS.API_NEED_SERVICES]: (old, data) => {
		return data.payload;
	}
}, []);
