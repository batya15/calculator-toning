import { handleActions } from 'redux-actions';
import ACTIONS from '../constants/actions';

export enum STEP {
	PLACES = 0,
	SERVICES = 1,
	PROPERTIES = 2
}

export default handleActions<STEP>({
	[ACTIONS.EDIT_ORDERS]: () => STEP.SERVICES,
	[ACTIONS.SELECT_SERVICE]: () => STEP.PROPERTIES,
	[ACTIONS.SAVE]: () => STEP.PLACES,
}, STEP.PLACES);
