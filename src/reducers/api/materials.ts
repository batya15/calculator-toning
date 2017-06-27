import {handleActions} from 'redux-actions';
import {Api} from "api";
import {ACTIONS} from "constants/actions";

export default handleActions<Api.IMaterial[]>({
	[ACTIONS.API_NEED_MATERIALS]: (old, data) => {
		return data.payload;
	}
}, []);
