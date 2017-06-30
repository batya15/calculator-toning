import {handleActions} from 'redux-actions';
import {Api} from "api";
import {ACTIONS} from "constants/actions";

export default handleActions<Api.IService[]>({
	[ACTIONS.API_NEED_SERVICES]: (old, data) => {
		return data.payload;
	},
	[ACTIONS.API_LOAD_FROM_FILE]: (old, data: {payload: {services: Api.IService[]}}) => {
		return data.payload.services;
	},
	[ACTIONS.API_ADD_NEW_SERVICE]: (old) => {
		return old.concat(
			{
				id:  old.reduce((max: number|null, i) => (max === null || max < i.id)? i.id : max , null) + 1,
				caption: 'Новая услуга',
				description: 'Описание новой услуги'
			}
		);
	},
	[ACTIONS.API_REMOVE_SERVICE]: (old, data: {payload: number}) => {
		return old.filter(i=> i.id !== data.payload);
	},
	[ACTIONS.API_SAVE_SERVICE]: (old, data: {payload: Api.IService}) => {
		return old.map(i=> {
			if (i.id === data.payload.id) {
				return {...data.payload}
			} else {
				return i;
			}
		});
	}
}, []);
