import {handleActions} from 'redux-actions';
import {Api} from "api";
import {ACTIONS} from "constants/actions";
import {Map} from 'immutable';

export default handleActions<Map<number, Api.IThickness>>({
	[ACTIONS.API_NEED_THICKNESS]: (old, data): Map<number, Api.IThickness> => {
		return Map<number, Api.IThickness>(data.payload.reduce((init, i): (number|Api.IThickness)[][] => {
			init.push([i.id, i]);
			return init;
		}, []));
	},
	[ACTIONS.API_LOAD_FROM_FILE]: (old, data: {payload: {thickness: Api.IThickness[]}}) => {
		return Map<number, Api.IColor>(data.payload.thickness.reduce((init, i): (number|Api.IThickness)[][] => {
			init.push([i.id, i]);
			return init;
		}, []));
	},
	[ACTIONS.API_ADD_NEW_THICKNESS]: (old) => {
		let id: number = old.reduce((max: number|null, i) => (max === null || max < i.id)? i.id : max , null) + 1;
		return old.set(id,
			{
				id:  id,
				caption: 'Новая толщина'
			}
		);
	},
	[ACTIONS.API_REMOVE_THICKNESS]: (old, data: {payload: number}) => {
		return old.delete(data.payload);
	},
	[ACTIONS.API_SAVE_THICKNESS]: (old, data: {payload: Api.IProducer}) => {
		return old.set(data.payload.id, data.payload);
	}
}, Map<number, Api.IThickness>());
