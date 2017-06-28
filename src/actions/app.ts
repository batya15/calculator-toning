import api, {Api} from 'api';
import {ACTIONS} from "../constants/actions";
import {createAction} from "redux-actions";

export const editPlaces = createAction(String(ACTIONS.EDIT_PLACES));
export const selectPlace = createAction(String(ACTIONS.SELECT_PLACES));
export const selectService = createAction(String(ACTIONS.SELECT_SERVICE));
export const save = createAction(String(ACTIONS.SAVE));
export const selectMaterial = createAction(String(ACTIONS.SELECT_MATERIAL));
export const needPlaces = createAction(String(ACTIONS.NEED_PLACES), api.details.get);
export const needServices = createAction(String(ACTIONS.NEED_SERVICES), api.services.get);

export default {
	editPlaces,
	selectPlace,
	selectService,
	save,
	selectMaterial,
	needPlaces,
	needServices,
}