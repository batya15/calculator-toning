import {handleActions} from 'redux-actions';
import {Api} from "api";
import {ACTIONS} from "constants/actions";

export default handleActions<Api.IProducer[]>({
	[ACTIONS.API_NEED_PRODUCERS]: (old, data) => {
		return data.payload;
	},
	[ACTIONS.API_ADD_NEW_PRODUCER]: (old) => {
		return old.concat(
			{
				id: old.reduce((max, i) => max < i.id? i.id : max , -Infinity) + 1,
				caption: 'new item'
			}
		);
	},
	[ACTIONS.API_REMOVE_PRODUCER]: (old, data: {payload: number}) => {
		return old.filter(i=> i.id !== data.payload);
	},
	[ACTIONS.API_SAVE_PRODUCER]: (old, data: {payload: Api.IProducer}) => {
		return old.map(i=> {
			if (i.id === data.payload.id) {
				return {
					id : data.payload.id,
					caption: data.payload.caption + "save"
				}
			} else {
				return i;
			}
		});
	}
}, []);
