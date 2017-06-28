import api, {Api} from 'api';
import {ACTIONS} from "../constants/actions";
import {createAction} from "redux-actions";

export const apiNeedDetails = createAction<Promise<Api.IDetail[]>>(String(ACTIONS.API_NEED_DETAILS), api.details.get);
export const apiAddNewDetail = createAction(String(ACTIONS.API_ADD_NEW_DETAIL));
export const apiRemoveDetail = createAction<number>(String(ACTIONS.API_REMOVE_DETAIL));
export const apiSaveDetail = createAction<Api.IProducer>(String(ACTIONS.API_SAVE_DETAIL));

export const apiNeedServices = createAction<Promise<Api.IService[]>>(String(ACTIONS.API_NEED_SERVICES), api.services.get);
export const apiAddNewService = createAction(String(ACTIONS.API_ADD_NEW_SERVICE));
export const apiRemoveService = createAction<number>(String(ACTIONS.API_REMOVE_SERVICE));
export const apiSaveService = createAction<Api.IProducer>(String(ACTIONS.API_SAVE_SERVICE));

export const apiNeedMaterials = createAction<Promise<Api.IMaterial[]>>(String(ACTIONS.API_NEED_MATERIALS), api.materials.get);
export const apiAddNewMaterial = createAction(String(ACTIONS.API_ADD_NEW_MATERIAL));
export const apiRemoveMaterial = createAction<number>(String(ACTIONS.API_REMOVE_MATERIAL));
export const apiSaveMaterial = createAction<Api.IProducer>(String(ACTIONS.API_SAVE_MATERIAL));

export const apiNeedProducers = createAction<Promise<Api.IProducer[]>>(String(ACTIONS.API_NEED_PRODUCERS), api.producers.get);
export const apiAddNewProducer = createAction(String(ACTIONS.API_ADD_NEW_PRODUCER));
export const apiRemoveProducer = createAction<number>(String(ACTIONS.API_REMOVE_PRODUCER));
export const apiSaveProducer = createAction<Api.IProducer>(String(ACTIONS.API_SAVE_PRODUCER));

export const apiNeedColors = createAction<Promise<Api.IColor[]>>(String(ACTIONS.API_NEED_COLORS), api.colors.get);
export const apiAddNewColor = createAction(String(ACTIONS.API_ADD_NEW_COLORS));
export const apiRemoveColor = createAction<number>(String(ACTIONS.API_REMOVE_COLORS));
export const apiSaveColor = createAction<Api.IProducer>(String(ACTIONS.API_SAVE_COLORS));

export const apiNeedThickness = createAction<Promise<Api.IThickness[]>>(String(ACTIONS.API_NEED_THICKNESS), api.thickness.get);
export const apiAddNewThickness = createAction(String(ACTIONS.API_ADD_NEW_THICKNESS);
export const apiRemoveThickness = createAction<number>(String(ACTIONS.API_REMOVE_THICKNESS));
export const apiSaveThickness = createAction<Api.IProducer>(String(ACTIONS.API_SAVE_THICKNESS));

export const apiNeedOpacity = createAction<Promise<Api.IOpacity[]>>(String(ACTIONS.API_NEED_OPACITY), api.opacity.get);
export const apiAddNewOpacity = createAction(String(ACTIONS.API_ADD_NEW_OPACITY));
export const apiRemoveOpacity = createAction<number>(String(ACTIONS.API_REMOVE_OPACITY));
export const apiSaveOpacity = createAction<Api.IProducer>(String(ACTIONS.API_SAVE_OPACITY));

