import * as React from 'react';
import * as styles from './totals.pcss';
import * as classnames from 'classnames';



export default class Totals extends React.Component<any, any> {
	constructor() {
		super();
		this.state = {
			cl: 'first',
			price: 0
		};
	}
	render() {
		return (
			<div>
				<h1>8500р.</h1>
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

