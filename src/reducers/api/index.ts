import details from './details';
import services from './services';
import materials from './materials';
import producers from './producers';
import colors from './colors';
import thickness from './thickness';
import opacity from './opacity';
import {Map} from 'immutable';

import {Api} from "api";
import {combineReducers} from "redux";

export type MapDetails = Map<number, Api.IDetail>;
export type MapService = Map<number, Api.IService>
export type MapMaterial = Map<number, Api.IMaterial>
export type MapProducer = Map<number, Api.IProducer>
export type MapColor = Map<number, Api.IColor>
export type MapOpacity = Map<number, Api.IOpacity>
export type MapThickness = Map<number, Api.IThickness>

export interface ApiStore {
	details: MapDetails,
	services: MapService,
	materials: MapMaterial,
	producers: MapProducer,
	colors: MapColor,
	opacity: MapOpacity,
	thickness: MapThickness
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
