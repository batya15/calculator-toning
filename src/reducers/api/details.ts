import {handleActions} from 'redux-actions';
import {Api} from "api";
import {ACTIONS} from "constants/actions";

export default handleActions<Api.IDetail[]>({
	[ACTIONS.API_NEED_DETAILS]: (old, data) => {
		return data.payload;
	},
	[ACTIONS.API_ADD_NEW_DETAIL]: (old) => {
		return old.concat(
			{
				id: old.reduce((max: number|null, i) => (max === null || max < i.id)? i.id : max , null) + 1,
				caption: 'new item',
				size: 1,
				cameraPosition: '',
				meshName: '',
				serviceIDs: []
			}
		);
	},
	[ACTIONS.API_REMOVE_DETAIL]: (old, data: {payload: number}) => {
		return old.filter(i=> i.id !== data.payload);
	},
	[ACTIONS.API_SAVE_DETAIL]: (old, data: {payload: Api.IDetail}) => {
		return old.map(i=> {
			if (i.id === data.payload.id) {
				return {
					id : data.payload.id,
					caption: data.payload.caption,
					size: 1,
					cameraPosition: '',
					meshName: '',
					serviceIDs: []
				}
			} else {
				return i;
			}
		});
	}
}, []);
