import * as React from 'react';
import * as styles from './totals.pcss';
import * as commonStyles from '../../common.pcss';
import {connect} from "react-redux";
import {RootState} from "reducers/index";
import {returntypeof} from "react-redux-typescript";
import {mapDispatchToProps} from "actions/index";
import * as Button from 'muicss/lib/react/button';
import {Order} from "../order/order";
import {IOrder} from "../../../reducers/orders";

interface IState {
	openModal: boolean,
	order: string
}

const mapStateToProps = (rootState: RootState) => ({
	details: rootState.api.details,
	orders: rootState.orders,
	materials: rootState.api.materials,
	services: rootState.api.services,
	producers: rootState.api.producers,
	opacity: rootState.api.opacity,
	thickness: rootState.api.thickness,
	colors: rootState.api.colors,
	user: rootState.user
});

const dispatchToProps = returntypeof(mapDispatchToProps);
const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & typeof dispatchToProps;

export class Totals extends React.Component<Props, IState> {
	constructor() {
		super();
		this.state = {
			openModal: false,
			order: ''
		};
	}

	private getTitleMaterial(order: IOrder): string {
		let result = this.props.details.get(order.detailId).caption + ' - ';
		if (order && order.materialId) {
			let material = this.props.materials.get(order.materialId);
			result += 'id: #' + order.materialId + ' / ';
			result += this.props.services.get(material.serviceId).caption;
			result += ' / ' + this.props.producers.get(material.producerId).caption;
			if (material.opacityId) {
				result += ' / ' + this.props.opacity.get(material.opacityId).caption;
			}
			if (material.thicknessId) {
				result += ' / ' + this.props.thickness.get(material.thicknessId).caption;
			}
			if (material.colorId) {
				result += ' / ' + this.props.colors.get(material.colorId).caption;
			}
		}
		return result;
	}

	private sendOrder() {
		this.setState({
			openModal: true,
			order: this.props.orders.map(i => this.getTitleMaterial(i)).join('\n')
		})
	}

	render() {
		let price = this.props.orders
			.filter(order => !!order.materialId)
			.reduce((sum, order) =>
				sum + this.props.details.get(order.detailId).size * this.props.materials.get(order.materialId).price
				, 0);
		return (
			<div className={styles.main}>
				<div className={styles.price}>{price}
					<span className={styles.currency}>руб.</span>
				</div>
				<div className={styles.footer}>
					<Button color="primary"
							className={styles.toOrder}
							onClick={() => this.sendOrder()}>Оформить заказ</Button>
					<Order
						price={price}
						order={this.state.order}
						open={this.state.openModal}
						close={() => this.setState({openModal: false})}
						user={this.props.user}
						actions={this.props.actions.app}
					/>
					<div className={styles.note}>
						*цены являются ориентировочной, точную цену уточняйте у менеджера
					</div>
				</div>
				<div className={commonStyles.clr}/>
			</div>
		)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Totals);

