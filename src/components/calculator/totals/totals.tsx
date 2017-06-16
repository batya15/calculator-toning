import * as React from 'react';
import * as styles from './totals.pcss';
import * as classnames from 'classnames';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

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
			<Paper zDepth={1} rounded={false}>
				<h1>8500р.</h1>
				<div className={styles.footer}>
					<RaisedButton label="Оформить заказ"
								  onTouchTap={() => alert("Модалочка будет, введите свое имя и телефон")}
								  primary={true}/>
					<div className={styles.c}>
						Цены являються приближенными и т.д. и бла бла бла
					</div>
				</div>
			</Paper>
		)
	}
}

