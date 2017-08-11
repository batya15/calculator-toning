import * as React from 'react';
import {connect} from 'react-redux';
import * as classnames from 'classnames';
import {returntypeof} from 'react-redux-typescript';
import * as styles from './calculator.pcss';
import * as commonStyles from 'components/common.pcss';
import {RootState} from "reducers/index";
import {mapDispatchToProps} from "actions";
import {STEP} from "reducers/step";
import Places from "./places/places";
import Services from "./services/services";
import Properties from "./properties/properties";
import Totals from "./totals/totals";
import Orientation from "./orientation/orientation";



interface IState {
	stepClass: string,
	loaded: boolean
}

const mapStateToProps = (rootState: RootState) => ({
	step: rootState.step,
	details: rootState.api.details,
	materials: rootState.api.materials
});

const dispatchToProps = returntypeof(mapDispatchToProps);
const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & typeof dispatchToProps;

class Calculator extends React.Component<Props, IState> {
	state: IState = {
		stepClass: styles.first,
		loaded: false
	};

	componentDidMount(): void {
		Promise.all([
			this.props.actions.api.apiNeedColors(),
			this.props.actions.api.apiNeedProducers(),
			this.props.actions.api.apiNeedOpacity(),
			this.props.actions.api.apiNeedThickness(),
			this.props.actions.api.apiNeedServices(),
			this.props.actions.api.apiNeedDetails(),
			this.props.actions.api.apiNeedMaterials()
		]).then(() => {
			this.props.actions.app.loadStorage({
				details: this.props.details,
				materials: this.props.materials
			});
			this.setState({loaded: true});
		});
	}

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
				<Orientation/>
				<div className={styles.controls}>
					<div className={classnames(styles.scroll, this.state.stepClass)}>
						<div className={classnames(styles.step, styles.areas)}>
							<Places/>
						</div>
						<div className={classnames(styles.step, styles.services)}>
							<Services/>
						</div>
						<div className={classnames(styles.step, styles.properties)}>
							<Properties/>
						</div>

					</div>
				</div>
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

