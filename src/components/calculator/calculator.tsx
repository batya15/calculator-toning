import * as React from 'react';
import * as styles from './calculator.pcss';
import * as commonStyles from 'components/common.pcss';
import * as classnames from 'classnames';
import Paper from 'material-ui/Paper';
import {connect} from 'react-redux';
import {RootState} from "../../reducers/index";
import {mapDispatchToProps} from "actions";
import {STEP} from "../../reducers/step";
import Places from "./places/places";
import Services from "./services/services";
import Properties from "./properties/properties";
import Totals from "./totals/totals";
import {returntypeof} from 'react-redux-typescript';

interface IState {
	stepClass: string
}

const mapStateToProps = (rootState: RootState) => ({
	step: rootState.step
});

const dispatchToProps = returntypeof(mapDispatchToProps);
const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & typeof dispatchToProps;

export class Calculator extends React.Component<Props, IState> {
	state: IState = {
		stepClass: styles.first
	};

	componentWillReceiveProps(nextProps) {
		switch (nextProps.step) {
			case STEP.SERVICES:
				this.setState({stepClass: styles.second});
				break;
			case  STEP.PROPERTIES:
				this.setState({stepClass: styles.third});
				break;
			default:
				this.setState({stepClass: this.props.step === STEP.PROPERTIES ? styles.reset : styles.first});
				break;
		}
	}

	render() {
		return (
			<div className={styles.calculator}>
				<Paper zDepth={1} rounded={false} className={styles.controls}>
					<div className={classnames(styles.scroll, this.state.stepClass)}>
						<div className={classnames(styles.step, styles.areas)}>
							<Places actions={this.props.actions}/>
						</div>
						<div className={classnames(styles.step, styles.services)}>
							<Services actions={this.props.actions}/>
						</div>
						<div className={classnames(styles.step, styles.properties)}>
							<Properties actions={this.props.actions}/>
						</div>

					</div>
				</Paper>
				<div className={styles.total}>
					<Totals/>
				</div>
				<div className={commonStyles.clr}/>
			</div>
		)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Calculator);

