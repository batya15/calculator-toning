import {handleActions} from 'redux-actions';
import {Api} from "api";
import {ACTIONS} from "constants/actions";
import {Map} from 'immutable';
import {MapDetails} from "./index";

export default handleActions<MapDetails>({
	[ACTIONS.API_NEED_DETAILS]: (old, data: {payload: Api.IDetail[]}) => {
		return Map<number, Api.IDetail>(data.payload.reduce((init, i): (number|Api.IDetail)[][]  => {
			init.push([i.id, i]);
			return init;
		}, []));
	},
	[ACTIONS.API_LOAD_FROM_FILE]: (old, data: { payload: { details: Api.IDetail[] } }) => {
		return Map<number, Api.IDetail>(data.payload.details.reduce((init, i): (number|Api.IDetail)[][]  => {
			init.push([i.id, i]);
			return init;
		}, []));
	},
	[ACTIONS.API_ADD_NEW_DETAIL]: (old) => {
		let id: number = old.reduce((max: number|null, i) => (max === null || max < i.id)? i.id : max , null) + 1;
		return old.set(id,
			{
				id: id,
				caption: 'Новая деталь',
				size: 1,
				cameraPosition: '',
				meshName: '',
				serviceIDs: []
			}
		);
	},
	[ACTIONS.API_REMOVE_DETAIL]: (old, data: {payload: number}) => {
		return old.delete(data.payload);
	},
	[ACTIONS.API_SAVE_DETAIL]: (old, data: {payload: Api.IDetail}) => {
		return old.set(data.payload.id, data.payload);
	}
}, Map<number, Api.IDetail>());
