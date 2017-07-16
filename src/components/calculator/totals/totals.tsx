import * as React from 'react';
import * as styles from './totals.pcss';
import * as classnames from 'classnames';
import {connect} from "react-redux";
import {RootState} from "reducers/index";
import {returntypeof} from "react-redux-typescript";
import {mapDispatchToProps} from "actions/index";
import {isNullOrUndefined} from "util";

interface IState {
}

const mapStateToProps = (rootState: RootState) => ({
	details: rootState.api.details,
	orders: rootState.orders,
	materials: rootState.api.materials
});

const dispatchToProps = returntypeof(mapDispatchToProps);
const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & typeof dispatchToProps;

export class Totals extends React.Component<Props, IState> {
	constructor() {
		super();
		this.state = {
			cl: 'first',
			price: 0
		};
	}

	render() {
		let p = this.props.orders
			.filter(order => !!order.materialId)
			.reduce((sum, order) =>
				sum + this.props.details.get(order.detailId).size * this.props.materials.get(order.materialId).price
				, 0);
		return (
			<div>
				<h1>{p}p.</h1>
				<div className={styles.footer}>
					<button label="Оформить заказ"/>
					<div className={styles.c}>
						Цены являються приближенными и т.д. и бла бла бла
					</div>
				</div>
			</div>
		)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Totals);

