import {handleActions} from 'redux-actions';
import {Api} from "api";
import {ACTIONS} from "constants/actions";

export default handleActions<Api.IColor[]>({
	[ACTIONS.API_NEED_COLORS]: (old, data) => {
		return data.payload;
	}
}, []);
