import {ACTIONS} from "../constants/actions";
import {createAction} from "redux-actions";
import {returntypeof} from "react-redux-typescript";
import {MapDetails, MapMaterial} from "../reducers/api/index";

export const editOrders = createAction<number[]>(String(ACTIONS.EDIT_ORDERS));
export const removeOrders = createAction<number[]>(String(ACTIONS.REMOVE_ORDERS));
export const toSelectDetails = createAction(String(ACTIONS.TO_SELECT_DETAILS));
export const toSelectServices = createAction(String(ACTIONS.BACK_TO_SELECT_SERVICES));
export const selectPlace = createAction(String(ACTIONS.SELECT_PLACES));
export const selectService = createAction<number>(String(ACTIONS.SELECT_SERVICE));
export const save = createAction<number>(String(ACTIONS.SAVE));
export const selectMaterial = createAction<number>(String(ACTIONS.SELECT_MATERIAL));
export const changeName = createAction<string>(String(ACTIONS.CHANGE_NAME));
export const changePhone = createAction<string>(String(ACTIONS.CHANGE_PHONE));
export const loadStorage = createAction<{details: MapDetails, materials: MapMaterial}>(String(ACTIONS.LOAD_STORAGE));

const AppActions = {
	editOrders,
	removeOrders,
	toSelectDetails,
	toSelectServices,
	selectPlace,
	selectService,
	save,
	selectMaterial,
	changeName,
	loadStorage,
	changePhone
};

const types =  returntypeof(()=>AppActions);
export type AppActionsType = typeof types;

export default AppActions;