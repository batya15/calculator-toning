import * as React from 'react';
import * as styles from './calculator.pcss';
import * as classnames from 'classnames';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Paper from 'material-ui/Paper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from "../../reducers/index";
import * as actions from "actions";
import {STEP} from "../../reducers/step";
import Places from "./places/places";
import Services from "./services/services";
import Properties from "./properties/properties";
import Totals from "./totals/totals";

export class Calculator extends React.Component<any, any> {
	constructor() {
		super();
		this.state = {
			cl: 'first',
			price: 0
		};
	}

	componentWillReceiveProps(nextProps) {
		switch (nextProps.step) {
			case STEP.SERVICES:
				this.setState({cl : 'second'});
				break;
			case  STEP.PROPERTIES:
				this.setState({cl : 'third'});
				break;
			default:
				this.setState({cl : this.props.step === STEP.PROPERTIES ? 'reset' : 'first'});
				break;
		}

		if (nextProps.step === STEP.PLACES ) {

		}
	}

	render() {
		return (
			<div className={classnames(styles.header)}>
				<Paper zDepth={1} rounded={false} className={classnames(styles.left)}>
					<div className={classnames(styles.scroll, styles[this.state.cl])}>
						<Places actions={this.props.actions}/>
						<Services actions={this.props.actions}/>
						<Properties actions={this.props.actions}/>
					</div>
				</Paper>
				<Totals/>
				<div className={classnames(styles.clr)}/>
			</div>
		)
	}
}

export default connect(
	(state: RootState) => {
		return {
			step: state.step
		};
	},
	(dispatch) => {
		return {
			actions: bindActionCreators(actions as any, dispatch)
		};
	}
)(Calculator);

