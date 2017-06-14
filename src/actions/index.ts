import { createAction } from 'redux-actions';
import ACTIONS from '../constants/actions';

export const editPlaces = createAction<any>(String(ACTIONS.EDIT_PLACES));
export const selectService = createAction<any>(String(ACTIONS.SELECT_SERVICE));
export const save = createAction<any>(String(ACTIONS.SAVE));
export const selectMaterial = createAction<any>(String(ACTIONS.SELECT_MATERIAL));