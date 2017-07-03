import {ACTIONS} from "../constants/actions";
import {createAction} from "redux-actions";

export const editOrders = createAction<number[]>(String(ACTIONS.EDIT_ORDERS));
export const removeOrders = createAction<number[]>(String(ACTIONS.REMOVE_ORDERS));
export const toSelectDetails = createAction(String(ACTIONS.TO_SELECT_DETAILS));
export const selectPlace = createAction(String(ACTIONS.SELECT_PLACES));
export const selectService = createAction<number>(String(ACTIONS.SELECT_SERVICE));
export const save = createAction(String(ACTIONS.SAVE));
export const selectMaterial = createAction(String(ACTIONS.SELECT_MATERIAL));

export default {
	editOrders,
	removeOrders,
	toSelectDetails,
	selectPlace,
	selectService,
	save,
	selectMaterial
}