import {combineReducers, Reducer} from 'redux';
import api, {ApiStore} from './api';
import step, {STEP} from './step';
import orders, {MapOrder} from './orders';

export interface RootState {
	step: STEP,
	orders: MapOrder,
	/*places: IPlaces,
	services: IServices,
	properties: any*/
	api: ApiStore
}

export default combineReducers<RootState>({
	api,
	step,
	orders
});
