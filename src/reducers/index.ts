import {combineReducers, Reducer} from 'redux';
import api, {ApiStore} from './api';

export interface RootState {
	/*step: STEP,
	 places: IPlaces,
	 services: IServices,
	 properties: any*/
	api: ApiStore
}

export default combineReducers<RootState>({
	api
});
