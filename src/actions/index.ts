import {bindActionCreators} from 'redux';
import * as apiActions from './api';
import * as appActions from './app';

export const mapDispatchToProps = (dispatch) => ({
	actions: {
		app: bindActionCreators(appActions, dispatch),
		api: bindActionCreators(apiActions, dispatch)
	},
});