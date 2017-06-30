import * as React from 'react';
import {Api} from "api";
import * as styles  from "./../admin.pcss";
import * as Button from 'muicss/lib/react/button';

interface IState {

}

interface IProps {
	item: Readonly<Api.IMaterial>;
	service: Readonly<Api.IService>;
	producer: Readonly<Api.IProducer>;
	color: Readonly<Api.IColor>;
	opacity: Readonly<Api.IOpacity>;
	thickness: Readonly<Api.IThickness>;

	onEdit: () => void;
	onDelete: () => void;
}

export class Item extends React.Component<IProps, IState> {
	render() {
		return (
			<div className={styles.item}>
				<span className={styles.id}>{this.props.item.id}</span>
				<div className={styles.controls}>
					<Button size="small" color="primary" onClick={this.props.onEdit}>Редактировать</Button>
					<Button size="small" color="danger" onClick={this.props.onDelete}><b>x</b></Button>
				</div>
				<div className={styles.caption}>
					{`${this.props.item.caption} /
					${this.props.producer.caption},
					${this.props.service ? this.props.service.caption : ''}
					${this.props.color ? this.props.color.caption : ''}
					${this.props.opacity ? this.props.opacity.caption : ''}
					${this.props.thickness ? this.props.thickness.caption : ''}
					`}
				</div>
			</div>
		)
	}
}

export default Item;