import * as React from 'react';
import * as styles from './services.pcss';
import * as classnames from 'classnames';
import FlatButton from 'material-ui/FlatButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {connect} from "react-redux";
import {RootState} from "reducers/index";
import {returntypeof} from "react-redux-typescript";
import {mapDispatchToProps} from "actions/index";

interface IState {
}

const mapStateToProps = (rootState: RootState) => ({
	places: rootState.places,
	services: rootState.services
});

const dispatchToProps = returntypeof(mapDispatchToProps);
const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & typeof dispatchToProps;

export class Services extends React.Component<Props, IState> {
	componentDidMount(): void {
		//todo: вынести на вверх - в верхний компонент
		this.props.actions.needServices();
	}

	render() {
		let ids: Set<string> = new Set;
		let items = this.props.places.list
			.filter(item => item.editable);

		items.forEach(item => {
			item.place.serviceIDs.forEach(i => {
				if (!ids.has(i)
					&& items.filter(e => e.place.serviceIDs.indexOf(i) >= 0).length === items.length
				) {
					ids.add(i)
				}
			});
		});
		return (
			<div className={styles.services}>
				<div className={classnames(styles.title)}>
					<FlatButton
						label="Назад"
						primary={true}
						onClick={() => this.props.actions.editPlaces()}
					/>
					<span><b>Выбор типа тонирования</b></span>
					<div className={styles.ar}>
						{this.props.places.list
							.filter(item => item.editable)
							.map(item => (<span key={item.place.id}>{item.place.caption}/</span>))
						}
					</div>
				</div>
				<RadioButtonGroup
					className={styles.container}
					name="shipSpeed"
					defaultSelected="light1">
					{this.props.services.list
						.filter(item => ids.has(item.id))
						.map(item => (
							<RadioButton
								key={item.id}
								style={{width: '50%'}}
								className={classnames(styles.srv)}
								value={"light" + item.id}
								label={item.caption + " (?)"}
								onClick={() => this.props.actions.selectService()}
							/>)
						)}
				</RadioButtonGroup>

			</div>
		)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Services);