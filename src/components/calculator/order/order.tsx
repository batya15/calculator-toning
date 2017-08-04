import * as React from 'react';
import * as styles from './order.pcss';
import * as classnames from 'classnames';
import * as Button from 'muicss/lib/react/button';
import * as Input from 'muicss/lib/react/input';
import * as InputMask from 'react-input-mask';
import * as Panel from 'muicss/lib/react/panel';
import Modal from 'react-modal';
import {MapUser} from "reducers/user";
import {AppActionsType} from "actions/app";


interface IState {

}

interface IProps {
	price: number,
	open: boolean,
	close: () => void,
	user: MapUser,
	actions: AppActionsType
}

export class Order extends React.Component<IProps, IState> {
	constructor() {
		super();
		this.state = {
			phone: '',
			price: 0
		};
	}

	render() {
		return (
			<Modal
				isOpen={this.props.open}
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
							onClick={this.props.close}>
							<i className="material-icons">close</i>
						</Button>
					</div>
					<div className={styles.form}>
						<div className={styles.priceModal}>
							Общая сумма заказа: <b>{this.props.price}р.</b>
							<div className={styles.note}>
								*цены являются ориентировочной, точную цену уточняйте у менеджера
							</div>
						</div>

						<div className={styles.control}>
							<Input
								autoFocus={!this.props.user.get('name')}
								className={styles.mb05rem}
								label="Имя"
								floatingLabel={true}
								defaultValue={this.props.user.get('name')}
								onChange={(e) => {
									this.props.actions.changeName(e.target.value)
								}}
							/>
						</div>
						<div className={classnames(styles.phone, styles.control)}>
							<Input
								className={classnames(styles.simple, styles.mb05rem)}
								value={this.props.user.get('phone')}
								onChange={() => {
								}}
								label="Телефон"
								floatingLabel={true}
							/>
							<InputMask
								autoFocus={this.props.user.get('name')}
								className={styles.mask}
								defaultValue={this.props.user.get('phone')}
								onChange={(e) => {
									this.props.actions.changePhone(e.target.value)
								}}
								mask="+7 (999) 999-99-99"/>
						</div>


						<div className={styles.error}>
							Ошибка, попробуйте еще раз...
						</div>
						<Button color="primary"
								className={styles.submit}
								onClick={console.log}>Оформить заказ</Button>
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
							<div>По номеру {this.props.user.get('phone')}</div>
						</div>
					</div>
				</Panel>
			</Modal>
		)
	}
}
