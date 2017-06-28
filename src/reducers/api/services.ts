import {handleActions} from 'redux-actions';
import {Api} from "api";
import {ACTIONS} from "constants/actions";

export default handleActions<Api.IService[]>({
	[ACTIONS.API_NEED_SERVICES]: (old, data) => {
		return data.payload;
	},
	[ACTIONS.API_ADD_NEW_SERVICE]: (old) => {
		return old.concat(
			{
				id:  old.reduce((max: number|null, i) => (max === null || max < i.id)? i.id : max , null) + 1,
				caption: 'new item',
				description: 'description2'
			}
		);
	},
	[ACTIONS.API_REMOVE_SERVICE]: (old, data: {payload: number}) => {
		return old.filter(i=> i.id !== data.payload);
	},
	[ACTIONS.API_SAVE_SERVICE]: (old, data: {payload: Api.IService}) => {
		return old.map(i=> {
			if (i.id === data.payload.id) {
				return {
					id : data.payload.id,
					caption: data.payload.caption + "save",
					description : data.payload.description + "save"
				}
			} else {
				return i;
			}
		});
	}
}, []);
