import {handleActions} from 'redux-actions';
import {Api} from "api";
import {ACTIONS} from "constants/actions";

export default handleActions<Api.IOpacity[]>({
	[ACTIONS.API_NEED_OPACITY]: (old, data): Api.IOpacity[] => {
		return data.payload;
	},
	[ACTIONS.API_ADD_NEW_OPACITY]: (old) => {
		return old.concat(
			{
				id:  old.reduce((max: number|null, i) => (max === null || max < i.id)? i.id : max , null) + 1,
				caption: 'new item'
			}
		);
	},
	[ACTIONS.API_REMOVE_OPACITY]: (old, data: {payload: number}) => {
		return old.filter(i=> i.id !== data.payload);
	},
	[ACTIONS.API_SAVE_OPACITY]: (old, data: {payload: Api.IOpacity}) => {
		return old.map(i=> {
			if (i.id === data.payload.id) {
				return {
					id : data.payload.id,
					caption: data.payload.caption
				}
			} else {
				return i;
			}
		});
	}
}, []);
