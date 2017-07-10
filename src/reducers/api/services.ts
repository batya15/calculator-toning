import {handleActions} from 'redux-actions';
import {Api} from "api";
import {ACTIONS} from "constants/actions";
import {Map} from 'immutable';

export default handleActions<Map<number, Api.IService>>({
	[ACTIONS.API_NEED_SERVICES]: (old, data) : Map<number, Api.IService> => {
		return Map<number, Api.IService>(data.payload.reduce((init, i): (number|Api.IService)[][] => {
			init.push([i.id, i]);
			return init;
		}, []));
	},
	[ACTIONS.API_LOAD_FROM_FILE]: (old, data: {payload: {services: Api.IService[]}}) => {
		return Map<number, Api.IColor>(data.payload.services.reduce((init, i): (number|Api.IService)[][]=> {
			init.push([i.id, i]);
			return init;
		}, []));
	},
	[ACTIONS.API_ADD_NEW_SERVICE]: (old) => {
		let id: number = old.reduce((max: number|null, i) => (max === null || max < i.id)? i.id : max , null) + 1;
		return old.set(id,
			{
				id:  old.reduce((max: number|null, i) => (max === null || max < i.id)? i.id : max , null) + 1,
				caption: 'Новая услуга',
				description: 'Описание новой услуги'
			}
		);
	},
	[ACTIONS.API_REMOVE_SERVICE]: (old, data: {payload: number}) => {
		return old.delete(data.payload);
	},
	[ACTIONS.API_SAVE_SERVICE]: (old, data: {payload: Api.IService}) => {
		return old.set(data.payload.id, data.payload);
	}
}, Map<number, Api.IService>());
