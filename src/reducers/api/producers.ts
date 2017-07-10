import {handleActions} from 'redux-actions';
import {Api} from "api";
import {ACTIONS} from "constants/actions";
import {Map} from 'immutable';

export default handleActions<Map<number, Api.IProducer>>({
	[ACTIONS.API_NEED_PRODUCERS]: (old, data: { payload: Api.IProducer[] }): Map<number, Api.IProducer> => {
		return Map<number, Api.IProducer>(data.payload.reduce((init, i): (number|Api.IProducer)[][]=> {
			init.push([i.id, i]);
			return init;
		}, []));
	},
	[ACTIONS.API_LOAD_FROM_FILE]: (old, data: {payload: {producers: Api.IProducer[]}}) => {
		return Map<number, Api.IColor>(data.payload.producers.reduce((init, i): (number|Api.IProducer)[][] => {
			init.push([i.id, i]);
			return init;
		}, []));
	},
		[ACTIONS.API_ADD_NEW_PRODUCER]: (old) => {
		let id: number = old.reduce((max: number|null, i) => (max === null || max < i.id)? i.id : max , null) + 1;
		return old.set(id,
			{
				id:  old.reduce((max: number|null, i) => (max === null || max < i.id)? i.id : max , null) + 1,
				caption: 'Новый производитель'
			}
		);
	},
	[ACTIONS.API_REMOVE_PRODUCER]: (old, data: {payload: number}) => {
		return old.delete(data.payload);
	},
	[ACTIONS.API_SAVE_PRODUCER]: (old, data: {payload: Api.IProducer}) => {
		return old.set(data.payload.id, data.payload);
	}
}, Map<number, Api.IProducer>());
