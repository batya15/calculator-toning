import {handleActions} from 'redux-actions';
import {Api} from "api";
import {ACTIONS} from "constants/actions";

export default handleActions<Api.IThickness[]>({
	[ACTIONS.API_NEED_THICKNESS]: (old, data): Api.IThickness[] => {
		return data.payload;
	},
	[ACTIONS.API_LOAD_FROM_FILE]: (old, data: {payload: {thickness: Api.IThickness[]}}) => {
		return data.payload.thickness;
	},
	[ACTIONS.API_ADD_NEW_THICKNESS]: (old) => {
		return old.concat(
			{
				id:  old.reduce((max: number|null, i) => (max === null || max < i.id)? i.id : max , null) + 1,
				caption: 'Новая толщина'
			}
		);
	},
	[ACTIONS.API_REMOVE_THICKNESS]: (old, data: {payload: number}) => {
		return old.filter(i=> i.id !== data.payload);
	},
	[ACTIONS.API_SAVE_THICKNESS]: (old, data: {payload: Api.IProducer}) => {
		return old.map(i=> {
			if (i.id === data.payload.id) {
				return {...data.payload}
			} else {
				return i;
			}
		});
	}
}, []);
