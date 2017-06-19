import {combineReducers, Reducer} from 'redux';
import step from "./step";
import places from "./places";
import services from "./services";
import {STEP} from "./step";
import {IPlaces} from "./places";
import {IServices} from "./services";

export interface RootState {
	step: STEP,
	places: IPlaces,
	services: IServices,
	properties: any
}

export default combineReducers<RootState>({
	step, places, services
});
