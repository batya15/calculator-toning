import { createAction } from 'redux-actions';
import ACTIONS from '../constants/actions';
import {bindActionCreators} from 'redux';
import api from 'api';


export const editPlaces = createAction(String(ACTIONS.EDIT_PLACES));
export const selectPlace = createAction(String(ACTIONS.SELECT_PLACES));
export const selectService = createAction(String(ACTIONS.SELECT_SERVICE));
export const save = createAction(String(ACTIONS.SAVE));
export const selectMaterial = createAction(String(ACTIONS.SELECT_MATERIAL));
export const needPlaces = createAction(String(ACTIONS.NEED_PLACES), api.places.get);

const actions = {editPlaces, selectService, save, selectMaterial, needPlaces, selectPlace};

export const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(actions as any, dispatch)
});