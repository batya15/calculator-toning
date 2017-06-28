import {handleActions} from 'redux-actions';
import {Api} from "api";
import {ACTIONS} from "constants/actions";

export default handleActions<Api.IMaterial[]>({
	[ACTIONS.API_NEED_MATERIALS]: (old, data) => {
		return data.payload;
	},
	[ACTIONS.API_ADD_NEW_MATERIAL]: (old) => {
		return old.concat(
			{
				id: old.reduce((max: number|null, i) => (max === null || max < i.id)? i.id : max , null) + 1,
				caption: 'new item',
				producerId: 1,
				colorId: null,
				opacityId: null,
				thicknessId: null,
				price: 0,
				serviceId: 1
			}
		);
	},
	[ACTIONS.API_REMOVE_MATERIAL]: (old, data: {payload: number}) => {
		return old.filter(i=> i.id !== data.payload);
	},
	[ACTIONS.API_SAVE_MATERIAL]: (old, data: {payload: Api.IMaterial}) => {
		return old.map(i=> {
			if (i.id === data.payload.id) {
				return {
					id : data.payload.id,
					caption: data.payload.caption + "save",
					producerId: 1,
					colorId: null,
					opacityId: null,
					thicknessId: null,
					price: 0,
					serviceId: 1
				}
			} else {
				return i;
			}
		});
	}
}, []);
