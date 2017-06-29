import {handleActions} from 'redux-actions';
import {Api} from "api";
import {ACTIONS} from "constants/actions";

export default handleActions<Api.IColor[]>({
	[ACTIONS.API_NEED_COLORS]: (old, data) => {
		return data.payload;
	},
	[ACTIONS.API_ADD_NEW_COLOR]: (old) => {
		return old.concat(
			{
				id: old.reduce((max: number|null, i) => (max === null || max < i.id)? i.id : max , null) + 1,
				caption: 'new item',
				rgb: "#ffdd00"
			}
		);
	},
	[ACTIONS.API_REMOVE_COLOR]: (old, data: {payload: number}) => {
		return old.filter(i=> i.id !== data.payload);
	},
	[ACTIONS.API_SAVE_COLOR]: (old, data: {payload: Api.IColor}) => {
		return old.map(i=> {
			if (i.id === data.payload.id) {
				return {
					id : data.payload.id,
					caption: data.payload.caption,
					rgb: data.payload.rgb
				}
			} else {
				return i;
			}
		});
	}
}, []);
