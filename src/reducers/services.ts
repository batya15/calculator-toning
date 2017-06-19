import { handleActions } from 'redux-actions';
import ACTIONS from '../constants/actions';
import {STATE} from "../constants/state";
import {Api} from "../api/index";

export interface IServices {
	state: STATE
	list: any[]
}

interface IServicesPayload {
	payload: Api.IPlace[]
}

const initial : IServices = {
	state: STATE.LOADED,
	list: []
};

export default handleActions<IServices>({
	[ACTIONS.NEED_SERVICES]: (old, data: any) : IServices => {
		console.log(data)
		return {
			state: STATE.LOADED,
			list: data.payload
		};
	}
}, initial);
