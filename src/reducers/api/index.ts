import details from './details';
import services from './services';
import materials from './materials';
import producers from './producers';
import colors from './colors';
import thickness from './thickness';
import opacity from './opacity';

import {Api} from "api";
import {combineReducers} from "redux";

export interface ApiStore {
	details: Api.IDetail[],
	services: Api.IService[],
	materials: Api.IMaterial[],
	producers: Api.IProducer[]
	colors: Api.IColor[]
	opacity: Api.IOpacity[]
	thickness: Api.IThickness[]
}

export default combineReducers<ApiStore>({
	details,
	services,
	materials,
	producers,
	colors,
	opacity,
	thickness
});
