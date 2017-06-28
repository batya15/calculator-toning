import * as React from 'react';
import {Api} from "api";


interface IState {

}

interface IProps {
	item: Readonly<Api.IDetail>;
	onEdit: () => void;
	onDelete: () => void;
}

export class Item extends React.Component<IProps, IState> {
	render() {
		return (
			<div key={this.props.item.id}>
				<span>{this.props.item.id}</span>
				<span>{this.props.item.caption}</span>
				<span>{this.props.item.size}</span>
				<button onClick={this.props.onDelete}>Удалить</button>
				<button onClick={this.props.onEdit}>Редактировать</button>
			</div>
		)
	}
}

export default Item;