export enum ACTIONS_TYPE {
	REQUEST = <any>'_REQUEST',
	FAILURE = <any>'_FAILURE'
}

export enum ACTIONS {
	API_NEED_DETAILS = <any>'API_NEED_DETAILS',
	API_ADD_NEW_DETAIL = <any>'API_ADD_NEW_DETAILS',
	API_REMOVE_DETAIL = <any>'API_REMOVE_DETAILS',
	API_SAVE_DETAIL = <any>'API_SAVE_DETAILS',

	API_NEED_SERVICES = <any>'API_NEED_SERVICES',
	API_ADD_NEW_SERVICE = <any>'API_ADD_NEW_SERVICE',
	API_REMOVE_SERVICE = <any>'API_REMOVE_SERVICE',
	API_SAVE_SERVICE = <any>'API_SAVE_SERVICE',

	API_NEED_MATERIALS = <any>'API_NEED_MATERIALS',
	API_ADD_NEW_MATERIAL = <any>'API_ADD_NEW_MATERIAL',
	API_REMOVE_MATERIAL = <any>'API_REMOVE_MATERIAL',
	API_SAVE_MATERIAL = <any>'API_SAVE_MATERIAL',

	API_NEED_COLORS = <any>'API_NEED_COLORS',
	API_ADD_NEW_COLOR = <any>'API_ADD_NEW_COLOR',
	API_REMOVE_COLOR = <any>'API_REMOVE_COLOR',
	API_SAVE_COLOR = <any>'API_SAVE_COLOR',

	API_NEED_PRODUCERS = <any>'API_NEED_PRODUCERS',
	API_ADD_NEW_PRODUCER = <any>'API_ADD_NEW_PRODUCER',
	API_REMOVE_PRODUCER = <any>'API_REMOVE_PRODUCER',
	API_SAVE_PRODUCER = <any>'API_SAVE_PRODUCER',

	API_NEED_THICKNESS = <any>'API_NEED_THICKNESS',
	API_ADD_NEW_THICKNESS = <any>'API_ADD_NEW_THICKNESS',
	API_REMOVE_THICKNESS = <any>'API_REMOVE_THICKNESS',
	API_SAVE_THICKNESS = <any>'API_SAVE_THICKNESS',

	API_NEED_OPACITY = <any>'API_NEED_OPACITY',
	API_ADD_NEW_OPACITY = <any>'API_ADD_NEW_OPACITY',
	API_REMOVE_OPACITY = <any>'API_REMOVE_OPACITY',
	API_SAVE_OPACITY = <any>'API_SAVE_OPACITY',

	API_LOAD_FROM_FILE = <any>'API_LOAD_FROM_FILE',

	EDIT_ORDERS = <any>'EDIT_ORDERS',
	REMOVE_ORDERS = <any>'REMOVE_ORDERS',
	TO_SELECT_DETAILS = <any>'TO_SELECT_DETAILS',
	BACK_TO_SELECT_SERVICES = <any>'BACK_TO_SELECT_SERVICES',

	SELECT_PLACES = <any>'SELECT_PLACES',
	SELECT_SERVICE = <any>'SELECT_SERVICE',
	SELECT_MATERIAL = <any>'SELECT_MATERIAL',
	SAVE = <any>'SAVE'
}

export default ACTIONS;
