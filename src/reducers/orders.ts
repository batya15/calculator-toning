import {handleActions} from 'redux-actions';
import ACTIONS from '../constants/actions';
import {STATE} from "../constants/state";
import {Api} from "../api/index";

export interface IOrder {
	detailId: number;
	editable: boolean;
	materialId?: number;
	oldMaterialId?: number;
	editableServicesId?: number; //temp editable service
}

export default handleActions<IOrder[]>({
	[ACTIONS.EDIT_ORDERS]: (old, data: { payload: number[] }): IOrder[] => {
		let result: IOrder[] = [];

		data.payload.forEach(id => {
			let order = old.filter(o => o.detailId === id);
			if (order.length > 0) {
				result.push({...order[0], editable: order[0].detailId === id});
			} else {
				result.push({detailId: id, editable: true});
			}
		});

		old.forEach(i => {
			if (!result.some(r => r.detailId === i.detailId)) {
				result.push({...i, editable: false});
			}
		});

		return result;
	},
	[ACTIONS.REMOVE_ORDERS]: (old, data: { payload: number[] }): IOrder[] => {
		return old.map(i => {
			if (data.payload.indexOf(i.detailId)) {
				return {...i, materialId: null};
			} else {
				return i
			}
		});
	},
	[ACTIONS.SELECT_SERVICE]: (old, data: { payload: number }): IOrder[] => {
		return old.map(i => {
			return {...i, editableServicesId: data.payload};
		});
	},
}, []);
