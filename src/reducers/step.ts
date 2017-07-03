import { handleActions } from 'redux-actions';
import ACTIONS from '../constants/actions';

export enum STEP {
	DETAILS = 0,
	SERVICES = 1,
	PROPERTIES = 2
}

export default handleActions<STEP>({
	[ACTIONS.EDIT_ORDERS]: () => STEP.SERVICES,
	[ACTIONS.TO_SELECT_DETAILS]: () => STEP.DETAILS,
	[ACTIONS.SELECT_SERVICE]: () => STEP.PROPERTIES,
	[ACTIONS.SAVE]: () => STEP.DETAILS,
}, STEP.DETAILS);
