import { createAction } from 'redux-actions';
import ACTIONS from '../constants/actions';
import {bindActionCreators} from 'redux';
import api, {Api} from 'api';


export const editPlaces = createAction(String(ACTIONS.EDIT_PLACES));
export const selectPlace = createAction(String(ACTIONS.SELECT_PLACES));
export const selectService = createAction(String(ACTIONS.SELECT_SERVICE));
export const save = createAction(String(ACTIONS.SAVE));
export const selectMaterial = createAction(String(ACTIONS.SELECT_MATERIAL));
export const needPlaces = createAction(String(ACTIONS.NEED_PLACES), api.details.get);
export const needServices = createAction(String(ACTIONS.NEED_SERVICES), api.services.get);

export const apiNeedDetails = createAction<Promise<Api.IDetail[]>>(String(ACTIONS.API_NEED_DETAILS), api.details.get);
export const apiNeedServices = createAction<Promise<Api.IService[]>>(String(ACTIONS.API_NEED_SERVICES), api.services.get);
export const apiNeedMaterials = createAction<Promise<Api.IMaterial[]>>(String(ACTIONS.API_NEED_MATERIALS), api.materials.get);

export const apiNeedProducers = createAction<Promise<Api.IProducer[]>>(String(ACTIONS.API_NEED_PRODUCERS), api.producers.get);
export const apiAddNewProducer = createAction(String(ACTIONS.API_ADD_NEW_PRODUCER));
export const apiRemoveProducer = createAction<number>(String(ACTIONS.API_REMOVE_PRODUCER));
export const apiSaveProducers = createAction<Api.IProducer>(String(ACTIONS.API_SAVE_PRODUCER));


export const apiNeedColors = createAction<Promise<Api.IColor[]>>(String(ACTIONS.API_NEED_COLORS), api.colors.get);
export const apiNeedThickness = createAction<Promise<Api.IThickness[]>>(String(ACTIONS.API_NEED_THICKNESS), api.thickness.get);
export const apiNeedOpacity = createAction<Promise<Api.IOpacity[]>>(String(ACTIONS.API_NEED_OPACITY), api.opacity.get);

export const actions = {
	editPlaces,
	selectService,
	save,
	selectMaterial,
	needPlaces,
	selectPlace,
	needServices,

	apiNeedProducers,
	apiAddNewProducer,
	apiRemoveProducer,
	apiSaveProducers,

	apiNeedDetails,
	apiNeedServices,
	apiNeedMaterials,
	apiNeedColors,
	apiNeedThickness,
	apiNeedOpacity
};

export const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(actions, dispatch)
});