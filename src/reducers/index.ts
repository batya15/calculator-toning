import {combineReducers, Reducer} from 'redux';
import step from "./step";
import places from "./places";
import {STEP} from "./step";
import {IPlaces} from "./places";

export interface RootState {
	step: STEP,
	places: IPlaces,
	services: any[],
	properties: any
}

export default combineReducers<RootState>({
	step, places
});
