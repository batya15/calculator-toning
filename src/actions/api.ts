import api, {Api} from 'api';
import {ACTIONS} from "../constants/actions";
import {createAction} from "redux-actions";
import {returntypeof} from "react-redux-typescript";

const apiNeedDetails = createAction<Promise<Api.IDetail[]>>(String(ACTIONS.API_NEED_DETAILS), api.details.get);
const apiAddNewDetail = createAction(String(ACTIONS.API_ADD_NEW_DETAIL));
const apiRemoveDetail = createAction<number>(String(ACTIONS.API_REMOVE_DETAIL));
const apiSaveDetail = createAction<Api.IDetail>(String(ACTIONS.API_SAVE_DETAIL));

const apiNeedServices = createAction<Promise<Api.IService[]>>(String(ACTIONS.API_NEED_SERVICES), api.services.get);
const apiAddNewService = createAction(String(ACTIONS.API_ADD_NEW_SERVICE));
const apiRemoveService = createAction<number>(String(ACTIONS.API_REMOVE_SERVICE));
const apiSaveService = createAction<Api.IService>(String(ACTIONS.API_SAVE_SERVICE));

const apiNeedMaterials = createAction<Promise<Api.IMaterial[]>>(String(ACTIONS.API_NEED_MATERIALS), api.materials.get);
const apiAddNewMaterial = createAction<{serviceId: number, producerId: number}>(String(ACTIONS.API_ADD_NEW_MATERIAL));
const apiRemoveMaterial = createAction<number>(String(ACTIONS.API_REMOVE_MATERIAL));
const apiSaveMaterial = createAction<Api.IMaterial>(String(ACTIONS.API_SAVE_MATERIAL));

const apiNeedProducers = createAction<Promise<Api.IProducer[]>>(String(ACTIONS.API_NEED_PRODUCERS), api.producers.get);
const apiAddNewProducer = createAction(String(ACTIONS.API_ADD_NEW_PRODUCER));
const apiRemoveProducer = createAction<number>(String(ACTIONS.API_REMOVE_PRODUCER));
const apiSaveProducer = createAction<Api.IProducer>(String(ACTIONS.API_SAVE_PRODUCER));

const apiNeedColors = createAction<Promise<Api.IColor[]>>(String(ACTIONS.API_NEED_COLORS), api.colors.get);
const apiAddNewColor = createAction(String(ACTIONS.API_ADD_NEW_COLOR));
const apiRemoveColor = createAction<number>(String(ACTIONS.API_REMOVE_COLOR));
const apiSaveColor = createAction<Api.IColor>(String(ACTIONS.API_SAVE_COLOR));

const apiNeedThickness = createAction<Promise<Api.IThickness[]>>(String(ACTIONS.API_NEED_THICKNESS), api.thickness.get);
const apiAddNewThickness = createAction(String(ACTIONS.API_ADD_NEW_THICKNESS));
const apiRemoveThickness = createAction<number>(String(ACTIONS.API_REMOVE_THICKNESS));
const apiSaveThickness = createAction<Api.IThickness>(String(ACTIONS.API_SAVE_THICKNESS));

const apiNeedOpacity = createAction<Promise<Api.IOpacity[]>>(String(ACTIONS.API_NEED_OPACITY), api.opacity.get);
const apiAddNewOpacity = createAction(String(ACTIONS.API_ADD_NEW_OPACITY));
const apiRemoveOpacity = createAction<number>(String(ACTIONS.API_REMOVE_OPACITY));
const apiSaveOpacity = createAction<Api.IOpacity>(String(ACTIONS.API_SAVE_OPACITY));

const apiLoadFromFile = createAction<any>(String(ACTIONS.API_LOAD_FROM_FILE));

const ApiActions = {
	apiLoadFromFile,
	apiNeedDetails,
	apiAddNewDetail,
	apiRemoveDetail,
	apiSaveDetail,
	apiNeedServices,
	apiAddNewService,
	apiRemoveService,
	apiSaveService,
	apiNeedMaterials,
	apiAddNewMaterial,
	apiRemoveMaterial,
	apiSaveMaterial,
	apiNeedProducers,
	apiAddNewProducer,
	apiRemoveProducer,
	apiSaveProducer,
	apiNeedColors,
	apiAddNewColor,
	apiRemoveColor,
	apiSaveColor,
	apiNeedThickness,
	apiAddNewThickness,
	apiRemoveThickness,
	apiSaveThickness,
	apiNeedOpacity,
	apiAddNewOpacity,
	apiRemoveOpacity,
	apiSaveOpacity,
};

const types =  returntypeof(()=>ApiActions);
export type ApiActionsType = typeof types;

export default ApiActions;