import * as React from 'react';
import * as styles from './services.pcss';
import * as classnames from 'classnames';
import FlatButton from 'material-ui/FlatButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import deleteProperty = Reflect.deleteProperty;

export default class Services extends React.Component<any, any> {
	render() {
		let servs = ["Затемнение", "Атермальная", "Атермальная хамелион", "Съемная", "Цветная", "Зеркальная", "Бронирование", "Защита от сколов"];
		let services = [];

		for (let i = 0; i < servs.length; i++) {
			services.push((

				<RadioButton
					key={i}
					style={{width: '50%'}}
					className={classnames(styles.srv)}
					value={"light" + i}
					label={servs[i] + " (?)"}
					onClick={() => this.props.actions.selectService()}
				/>

			))
		}

		return (
			<div className={styles.services}>
				<div className={classnames(styles.title)}>
					<FlatButton
						label="Назад"
						primary={true}
						onClick={() => this.props.actions.editPlaces()}
					/>
					<span><b>Выбор типа тонирования</b></span>
					<div className={styles.ar}>Заднее/лобовое/передние боковые</div>
				</div>
				<RadioButtonGroup className={styles.container} name="shipSpeed"
								  defaultSelected="light1">
					{services}
				</RadioButtonGroup>

			</div>
		)
	}
}
