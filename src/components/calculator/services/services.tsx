import * as React from 'react';
import * as styles from './services.pcss';
import * as classnames from 'classnames';
import FlatButton from 'material-ui/FlatButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {connect} from "react-redux";
import {RootState} from "reducers/index";
import {returntypeof} from "react-redux-typescript";
import {mapDispatchToProps} from "actions/index";
import {Place} from "../../../reducers/places";

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

	static getAvailableServiceIds(list: Place[]) : Set<string> {
		let result: Set<string> = new Set;

		let itemsFilter = list.filter(item => item.editable);

		let idsCount = itemsFilter
			.reduce((result, item) => result.concat(item.place.serviceIDs), [])
			.reduce((result, id) => {
				if (result[id]) {
					result[id] += 1;
				} else {
					result[id] = 1;
				}
				return result;
			}, {});

		for (let key in idsCount) {
			if (idsCount.hasOwnProperty(key) && idsCount[key] >= itemsFilter.length) {
				result.add(key)
			}
		}
		return result;
	}

	private selectedService(id: string) {
		setTimeout(()=> {
			this.props.actions.selectService(id);
		}, 400);
	}

	render() {
		let availableServiceIds: Set<string> = Services.getAvailableServiceIds(this.props.places.list);
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
						.filter(item => availableServiceIds.has(item.id))
						.map(item => (
							<RadioButton
								key={item.id}
								style={{width: '50%'}}
								className={classnames(styles.srv)}
								value={"light" + item.id}
								label={item.caption + " (?)"}
								onClick={() => this.selectedService(item.id)}
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