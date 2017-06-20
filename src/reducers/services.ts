import { handleActions } from 'redux-actions';
import ACTIONS from '../constants/actions';
import {STATE} from "../constants/state";
import {Api} from "../api/index";

export interface IServices {
	state: STATE
	list: Api.IService[]
}

interface IServicesPayload {
	payload: Api.IService[]
}

const initial : IServices = {
	state: STATE.LOADED,
	list: []
};

export default handleActions<IServices>({
	[ACTIONS.NEED_SERVICES]: (old, data: IServicesPayload) : IServices => {
		return {
			state: STATE.LOADED,
			list: data.payload
		};
	}
}, initial);
