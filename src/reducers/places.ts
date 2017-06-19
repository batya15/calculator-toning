import { handleActions } from 'redux-actions';
import ACTIONS from '../constants/actions';
import {STATE} from "../constants/state";
import {Api} from "../api/index";

export class Place {
	place: Api.IPlace;
	selected: boolean;
	editable: boolean = false;
	order: any;
	constructor(place: Api.IPlace, selected : boolean = false) {
		this.place = place;
		this.selected = selected
	}

	setEditable(b: boolean): Place {
		this.editable = b;
		return this;
	}
}

export interface IPlaces {
	state: STATE
	list: Place[]
}

interface IPlacesPayload {
	payload: Api.IPlace[]
}

const initial : IPlaces = {
	state: STATE.LOADED,
	list: []
};

interface ISelectPlaceAction {
	payload: {
		places: Place[],
		selected: boolean
	}
}

interface IEditPlaceAction {
	payload: Place[]
}

export default handleActions<IPlaces>({
	[ACTIONS.NEED_PLACES]: (old, data: IPlacesPayload) : IPlaces => {
		return {
			state: STATE.LOADED,
			list: data.payload.map(i => new Place(i))
		};
	},
	[ACTIONS.SELECT_PLACES]: (old: IPlaces, data: ISelectPlaceAction) : IPlaces => {
		let ids: string[] = data.payload.places.map(i=> i.place.id);
		return {
			state: STATE.LOADED,
			list: old.list.map(i=> {
				if (ids.indexOf(i.place.id) >= 0) {
					return new Place(i.place, data.payload.selected);
				} else {
					return new Place(i.place, i.selected);
				}
			})
		};
	},
	[ACTIONS.EDIT_PLACES]: (old: IPlaces, data: IEditPlaceAction) : IPlaces =>  {
		let ids: string[] = data.payload.map(i=> i.place.id);
		return {
			state: STATE.LOADED,
			list: old.list.map(i=> new Place(i.place, i.selected).setEditable(ids.indexOf(i.place.id) >= 0))
		};
	},
}, initial);
