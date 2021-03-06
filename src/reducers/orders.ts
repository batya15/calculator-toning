import {handleActions} from 'redux-actions';
import ACTIONS from '../constants/actions';
import {Map} from 'immutable';
import {MapDetails, MapMaterial} from "./api/index";
import details from "./api/details";

export interface IOrder {
	detailId: number;
	editable: boolean;
	materialId?: number;
	oldMaterialId?: number;
	editableServicesId?: number; //temp editable service
}

export type MapOrder = Map<number, IOrder>;

export default handleActions<MapOrder>({
	[ACTIONS.EDIT_ORDERS]: (old, data: { payload: number[] }): MapOrder => {
		let result: IOrder[] = [];

		data.payload.forEach(id => {
			let order = old.get(id);
			if (order) {
				result.push({...order, editable: order.detailId === id});
			} else {
				result.push({detailId: id, editable: true});
			}
		});

		old.forEach(i => {
			if (!result.some(r => r.detailId === i.detailId)) {
				result.push({...i, editable: false});
			}
		});

		return Map<number, IOrder>(result.reduce((init, item) => {
			init.push([item.detailId, item]);
			return init;
		}, []));
	},
	[ACTIONS.REMOVE_ORDERS]: (old, data: { payload: number[] }) => {
		return old.map<IOrder>(i => {
			if (data.payload.indexOf(i.detailId) >= 0) {
				return {...i, materialId: null};
			} else {
				return i
			}
		});
	},
	[ACTIONS.SELECT_SERVICE]: (old, data: { payload: number }) => {
		return old.map(i => {
			return {...i, oldMaterialId: i.materialId, editableServicesId: data.payload};
		});
	},
	[ACTIONS.BACK_TO_SELECT_SERVICES]: (old) => {
		return old.map(i => {
			return {...i, materialId: i.oldMaterialId};
		});
	},
	[ACTIONS.SELECT_MATERIAL]: (old, data: {payload: number}) => {
		return old.map(i => {
			if (i.editable) {
				return {...i, materialId: data.payload};
			}
			return i;
		});
	},
	[ACTIONS.SAVE]: (old, data: {payload: number}) => {
		let orders = old.map(i => {
			if (i.editable) {
				return {...i, materialId: data.payload};
			}
			return i;
		});
		localStorage.orders = JSON.stringify(orders.toJS());
		return orders;
	},
	[ACTIONS.LOAD_STORAGE] : (old, data: {payload : {details: MapDetails, materials: MapMaterial}}) => {
		let storage = {};
		let result = Map();
		try {
			storage = JSON.parse(localStorage.orders);
		} catch (e) {}
		for (let key in storage) {
			if (storage.hasOwnProperty(key)
				&& data.payload.details.has(storage[key].detailId)
				&& data.payload.materials.has(storage[key].materialId)
			) {
				result = result.set(parseInt(key), storage[key])
			}
		}
		return result;
	}
}, Map<number, IOrder>());
