import {combineReducers, Reducer} from 'redux';
import step from "./step";
import {STEP} from "./step";

export interface RootState {
	step: STEP,
	places: any[],
	services: any[],
	properties: any
}

export default combineReducers<RootState>({
	step
});
