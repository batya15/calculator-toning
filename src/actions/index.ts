import {bindActionCreators} from 'redux';
import apiActions from './api';
import appActions from './app';

export const mapDispatchToProps = (dispatch) => ({
	actions: {
		app: bindActionCreators(appActions, dispatch),
		api: bindActionCreators(apiActions, dispatch)
	},
});