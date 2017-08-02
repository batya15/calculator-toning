import * as React from 'react';
import * as styles from './totals.pcss';
import * as commonStyles from '../../common.pcss';
import * as classnames from 'classnames';
import {connect} from "react-redux";
import {RootState} from "reducers/index";
import {returntypeof} from "react-redux-typescript";
import {mapDispatchToProps} from "actions/index";
import * as Button from 'muicss/lib/react/button';
import * as Input from 'muicss/lib/react/input';
import * as InputMask from 'react-input-mask';
import * as Panel from 'muicss/lib/react/panel';
import Modal from 'react-modal';


interface IState {
	openModal: boolean,
	phone: string
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
			openModal: true,
			phone: ''
		};
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
							onClick={() => this.setState({openModal: true})}>Оформить заказ</Button>
					<Modal
						isOpen={this.state.openModal}
						contentLabel="order"
						className={styles.modal}
						overlayClassName={styles.overlay}
					>
						<Panel className={styles.panel}>
							<div className={styles.header}>
								<span className={styles.title}>Предварительный заказ</span>
								<Button
									className={styles.close}
									variant="flat"
									onClick={() => this.setState({openModal: false})}>
									<i className="material-icons">close</i>
								</Button>
							</div>
							<div className={styles.form}>
								<div className={styles.priceModal}>
									Общая сумма заказа: <b>{price}р.</b>
									<div className={styles.note}>
										*цены являются ориентировочной, точную цену уточняйте у менеджера
									</div>
								</div>

								<div className={styles.control}>
									<Input autoFocus={true} className={styles.mb05rem} label="Имя" floatingLabel={true}/>
								</div>
								<div className={classnames(styles.phone, styles.control)}>
									<Input className={classnames(styles.simple, styles.mb05rem)} value={this.state.phone} onChange={() => {
									}} label="Телефон" floatingLabel={true}/>
									<InputMask className={styles.mask}
											   onChange={(e) => this.setState({phone: e.target.value})}
											   mask="+7 (999) 999-99-99"/>
								</div>


								<div className={styles.error}>
									Ошибка, попробуйте еще раз...
								</div>
								<Button color="primary"
										className={styles.submit}
										onClick={() => this.setState({openModal: true})}>Оформить заказ</Button>
							</div>

							<div className={styles.preloader}>
								<div className={styles.inner}>
									<div className={styles.circ1}/>
									<div className={styles.circ2}/>
									<div className={styles.circ3}/>
									<div className={styles.circ4}/>
								</div>
							</div>
							<div className={styles.success}>
								<div className={styles.text}>
									<div>Спасибо, Имя, что воспользовались нашим сервисом!</div>
									<div>Наш менеджер в ближайшее время свяжеться с Вами.</div>
									<div>По номеру {this.state.phone}</div>
								</div>
							</div>
						</Panel>
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

