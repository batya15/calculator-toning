import {handleActions} from 'redux-actions';
import {Api} from "api";
import {ACTIONS} from "constants/actions";

export default handleActions<Api.IThickness[]>({
	[ACTIONS.API_NEED_THICKNESS]: (old, data): Api.IThickness[] => {
		return data.payload;
	}
}, []);
