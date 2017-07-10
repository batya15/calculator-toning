import {handleActions} from 'redux-actions';
import {Api} from "api";
import {ACTIONS} from "constants/actions";
import {Map} from 'immutable';

export default handleActions<Map<number, Api.IColor>>({
	[ACTIONS.API_NEED_COLORS]: (old, data: { payload: Api.IColor[] }): Map<number, Api.IColor> => {
		return Map<number, Api.IColor>(data.payload.reduce((init, i): (number|Api.IColor)[][] => {
			init.push([i.id, i]);
			return init;
		}, []));
	},
	[ACTIONS.API_LOAD_FROM_FILE]: (old, data: { payload: { colors: Api.IColor[] } }) => {
		return Map<number, Api.IColor>(data.payload.colors.reduce((init, i): (number|Api.IColor)[][] => {
			init.push([i.id, i]);
			return init;
		}, []));
	},
	[ACTIONS.API_ADD_NEW_COLOR]: (old) => {
		let id: number = old.reduce((max: number | null, i) => (max === null || max < i.id) ? i.id : max, null) + 1;
		return old.set(id,
			{
				id: id,
				caption: 'Новый цвет',
				rgb: "#ffdd00"
			}
		);
	},
	[ACTIONS.API_REMOVE_COLOR]: (old, data: { payload: number }) => {
		return old.delete(data.payload);
	},
	[ACTIONS.API_SAVE_COLOR]: (old, data: { payload: Api.IColor }) => {
		return old.set(data.payload.id, data.payload);
	}
}, Map<number, Api.IColor>());
