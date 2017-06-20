import { handleActions } from 'redux-actions';
import ACTIONS from '../constants/actions';

export interface IEditable {
	serviceId: string
}

const initial : IEditable = {
	serviceId: null
};

interface IEditablePayload {
	payload: string
}

export default handleActions<IEditable>({
	[ACTIONS.SELECT_SERVICE]: (old, data: IEditablePayload) : IEditable => {
		return {
			serviceId: data.payload
		};
	}
}, initial);
