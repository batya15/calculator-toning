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
		return data.payload.map(id => {
			let order = old.filter(o => o.detailId === id);
			if (order.length > 0) {
				return {...order[0], editable: false};
			} else {
				return {detailId: id, editable: true};
			}
		});
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
}, []);
