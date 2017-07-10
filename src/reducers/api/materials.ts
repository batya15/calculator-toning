import {handleActions} from 'redux-actions';
import {Api} from "api";
import {ACTIONS} from "constants/actions";
import {Map} from 'immutable';
import {isNumber} from "util";

export default handleActions<Map<number, Api.IMaterial>>({
	[ACTIONS.API_NEED_MATERIALS]: (old, data: { payload: Api.IColor[] }): Map<number, Api.IMaterial> => {
		return Map<number, Api.IMaterial>(data.payload.reduce((init, i): (number|Api.IMaterial)[][]  => {
			init.push([i.id, i]);
			return init;
		}, []));
	},
	[ACTIONS.API_LOAD_FROM_FILE]: (old, data: { payload: { materials: Api.IMaterial[] } }) => {
		return Map<number, Api.IMaterial>(data.payload.materials.reduce((init, i): (number|Api.IMaterial)[][]  => {
			init.push([i.id, i]);
			return init;
		}, []));
	},
	[ACTIONS.API_ADD_NEW_MATERIAL]: (old, data: {payload: {serviceId: number, producerId: number}}) => {
		let id: number = old.reduce((max: number | null, i) => (max === null || max < i.id) ? i.id : max, null) + 1;
		return old.set( id ,
			{
				id: id,
				caption: 'Новый материал',
				producerId: data.payload.producerId,
				colorId: null,
				opacityId: null,
				thicknessId: null,
				price: 0,
				serviceId: data.payload.serviceId
			}
		);
	},
	[ACTIONS.API_REMOVE_MATERIAL]: (old, data: {payload: number}) => {
		return old.delete(data.payload);
	},
	[ACTIONS.API_SAVE_MATERIAL]: (old, data: {payload: Api.IMaterial}) => {
		return old.set(data.payload.id, data.payload);
	}
}, Map<number,  Api.IMaterial>());
