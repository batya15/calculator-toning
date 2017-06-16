import { createAction } from 'redux-actions';
import ACTIONS from '../constants/actions';
import {bindActionCreators} from 'redux';

export const editPlaces = createAction<any>(String(ACTIONS.EDIT_PLACES));
export const selectService = createAction<any>(String(ACTIONS.SELECT_SERVICE));
export const save = createAction<any>(String(ACTIONS.SAVE));
export const selectMaterial = createAction<any>(String(ACTIONS.SELECT_MATERIAL));

const actions = {editPlaces, selectService, save, selectMaterial};

export const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(actions as any, dispatch)
});