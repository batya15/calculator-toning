import {handleActions} from 'redux-actions';
import {Api} from "api";
import {ACTIONS} from "constants/actions";

export default handleActions<Api.IDetail[]>({
	[ACTIONS.API_NEED_DETAILS]: (old, data) => {
		return data.payload;
	}
}, []);
