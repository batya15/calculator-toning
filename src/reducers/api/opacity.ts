import {handleActions} from 'redux-actions';
import {Api} from "api";
import {ACTIONS} from "constants/actions";
import {Map} from 'immutable';

export default handleActions<Map<number, Api.IOpacity>>({
	[ACTIONS.API_NEED_OPACITY]: (old, data: { payload: Api.IOpacity[] }): Map<number, Api.IOpacity> => {
		return Map<number, Api.IOpacity>(data.payload.reduce((init, i): (number|Api.IOpacity)[][] => {
			init.push([i.id, i]);
			return init;
		}, []));
	},
	[ACTIONS.API_LOAD_FROM_FILE]: (old, data: { payload: { opacity: Api.IOpacity[] } }) => {
		return Map<number, Api.IOpacity>(data.payload.opacity.reduce((init, i): (number|Api.IOpacity)[][] => {
			init.push([i.id, i]);
			return init;
		}, []));
	},
	[ACTIONS.API_ADD_NEW_OPACITY]: (old) => {
		let id: number = old.reduce((max: number | null, i) => (max === null || max < i.id) ? i.id : max, null) + 1;
		return old.set(id,
			{
				id: old.reduce((max: number | null, i) => (max === null || max < i.id) ? i.id : max, null) + 1,
				caption: 'Новая прозрачность'
			}
		);
	},
	[ACTIONS.API_REMOVE_OPACITY]: (old, data: { payload: number }) => {
		return old.delete(data.payload);
	},
	[ACTIONS.API_SAVE_OPACITY]: (old, data: { payload: Api.IOpacity }) => {
		return old.set(data.payload.id, data.payload);
	}
}, Map<number, Api.IOpacity>());
