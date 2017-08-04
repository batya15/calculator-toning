import {combineReducers, Reducer} from 'redux';
import api, {ApiStore} from './api';
import step, {STEP} from './step';
import orders, {MapOrder} from './orders';
import user, {MapUser} from "./user";

export interface RootState {
	step: STEP,
	orders: MapOrder,
	user: MapUser,
	api: ApiStore,
}

export default combineReducers<RootState>({
	api,
	step,
	orders,
	user
});
