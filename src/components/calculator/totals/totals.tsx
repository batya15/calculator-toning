import * as React from 'react';
import * as styles from './totals.pcss';
import * as commonStyles from '../../common.pcss';
import * as classnames from 'classnames';
import {connect} from "react-redux";
import {RootState} from "reducers/index";
import {returntypeof} from "react-redux-typescript";
import {mapDispatchToProps} from "actions/index";
import * as Button from 'muicss/lib/react/button';
import Modal from 'react-modal';

interface IState {
	openModal: boolean
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
			openModal: false
		};
	}

	render() {
		let p = this.props.orders
			.filter(order => !!order.materialId)
			.reduce((sum, order) =>
				sum + this.props.details.get(order.detailId).size * this.props.materials.get(order.materialId).price
				, 0);
		return (
			<div className={styles.main}>
				<div className={styles.price}>{p}
					<span className={styles.currency}>руб.</span>
				</div>
				<div className={styles.footer}>
					<Button color="primary"
							className={styles.toOrder}
							onClick={() => this.setState({openModal : true})}>Оформить заказ</Button>
					<Modal
						isOpen={this.state.openModal}
						contentLabel="order"
						className="Modal"
						overlayClassName="Overlay"
					>
						<h1>Modal Content</h1>
						<p>Etc.</p>
					</Modal>
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

