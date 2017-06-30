import * as React from 'react';
import {Api} from "api";
import * as styles  from "./../admin.pcss";
import * as Button from 'muicss/lib/react/button';

interface IState {
}

interface IProps {
	item: Readonly<Api.IService>;
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
				<div className={styles.caption}>{this.props.item.caption + ' / ' + this.props.item.description}</div>
			</div>
		)
	}
}

export default Item;