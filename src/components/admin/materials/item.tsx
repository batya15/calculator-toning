import * as React from 'react';
import {Api} from "api";


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
			<div key={this.props.item.id}>
				<span>{this.props.item.id}</span>
				<span>{this.props.item.caption}</span>
				<span>{this.props.producer.caption}</span>
				<span>{this.props.service && this.props.service.caption}</span>
				<span>{this.props.color && this.props.color.caption}</span>
				<span>{this.props.opacity && this.props.opacity.caption}</span>
				<span>{this.props.thickness && this.props.thickness.caption}</span>
				<button onClick={this.props.onDelete}>Удалить</button>
				<button onClick={this.props.onEdit}>Редактировать</button>
			</div>
		)
	}
}

export default Item;