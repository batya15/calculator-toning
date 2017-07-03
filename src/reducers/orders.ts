import { handleActions } from 'redux-actions';
import ACTIONS from '../constants/actions';
import {STATE} from "../constants/state";
import {Api} from "../api/index";

export interface IOrder {
	detailId: number;
	materialId?: number;
	servicesId?: number;
	editable: boolean;
	oldMaterialId?: number;
}

export default handleActions<IOrder[]>({

}, []);
