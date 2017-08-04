import {handleActions} from 'redux-actions';
import ACTIONS from '../constants/actions';
import {Map} from 'immutable';

export interface IUser {
	name: string;
	phone: string;
}

interface ImmutableMap<T> extends Map<string, any> {
	get<K extends keyof T>(name: K): T[K];
}

export type MapUser = ImmutableMap<IUser>;

export default handleActions<MapUser>({
	[ACTIONS.CHANGE_NAME]: (old, data: { payload: string }): MapUser => {
		return old.set('name', data.payload)
	},
	[ACTIONS.CHANGE_PHONE]: (old, data: { payload: number[] }) => {
		return old.set('phone', data.payload)
	}
}, Map({name: '', phone: ''}));
