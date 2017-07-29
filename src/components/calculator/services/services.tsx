import * as React from 'react';
import * as styles from './services.pcss';
import * as classnames from 'classnames';
import * as Button from 'muicss/lib/react/button';
import {connect} from "react-redux";
import {RootState} from "reducers/index";
import {returntypeof} from "react-redux-typescript";
import {mapDispatchToProps} from "actions/index";
import {STEP} from "../../../reducers/step";
import * as ReactTooltip from 'react-tooltip'

interface IState {
	editableServiceId: number
}

const mapStateToProps = (rootState: RootState) => ({
	details: rootState.api.details,
	orders: rootState.orders,
	services: rootState.api.services,
	materials: rootState.api.materials,
	step: rootState.step
});

const dispatchToProps = returntypeof(mapDispatchToProps);
const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & typeof dispatchToProps;

export class Services extends React.Component<Props, IState> {

	public state = {
		editableServiceId: null
	};

	private getAvailableServiceIds(): Set<number> {
		let result: Set<number> = new Set;

		let itemsFilter = this.props.orders.filter(o => o.editable);

		let idsCount = itemsFilter
			.reduce((init, order) => {
				if (this.props.details.get(order.detailId)) {
					return init.concat(this.props.details.get(order.detailId).serviceIDs);
				}
				return init;
			}, [])
			.reduce((result, id) => {
				if (result[id]) {
					result[id] += 1;
				} else {
					result[id] = 1;
				}
				return result;
			}, {});

		for (let key in idsCount) {
			if (idsCount.hasOwnProperty(key) && idsCount[key] >= itemsFilter.size) {
				result.add(parseInt(key))
			}
		}
		return result;
	}

	private selectedService(id: number) {
		this.setState({editableServiceId: id});
		setTimeout(() => {
			this.props.actions.app.selectService(id);
		}, 400);
	}

	shouldComponentUpdate(nextProps, nextState): boolean {
		return nextProps.step === STEP.SERVICES;
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.step === STEP.DETAILS) {
			this.setState({editableServiceId: null})
		}
	}

	render() {
		let availableServiceIds: Set<number> = this.getAvailableServiceIds();
		return (
			<div className={styles.services}>
				<div className={styles.header}>
					<Button
						className={styles.back}
						variant="flat"
						onClick={() => this.props.actions.app.toSelectDetails()}
					>
						<i className="material-icons">arrow_back</i>
					</Button>
					<div className={styles.title}>
						<div className={styles.bold}>Выбор типа тонирования</div>
						<div className={styles.details}>
							{
								this.props.orders
									.toArray()
									.filter(item => item.editable)
									.map(item => this.props.details.get(item.detailId).caption)
									.join(' / ')
							}
						</div>
					</div>
				</div>
				{this.props.services
					.toArray()
					.filter(item => availableServiceIds.has(item.id))
					.map(item => (
						<div
							key={item.id}
							className={styles.service}
							onClick={() => this.selectedService(item.id)}
						>
							<div className={classnames({
								[styles.checkbox]: true,
								[styles.checked]: item.id === this.state.editableServiceId
							})}
							/>
							{item.caption}
							{item.description &&
							<span
								data-for={`service_${item.id}`}
								data-tip={item.description}
								className={styles.help}>
								(?)
							</span>
							}
							<ReactTooltip place="bottom" id={`service_${item.id}`}/>
						</div>)
					)}

			</div>
		)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Services);