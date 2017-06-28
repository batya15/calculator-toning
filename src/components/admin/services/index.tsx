import * as React from 'react';
import {Api} from "api";
import {Item} from "./item";
import {Editor} from "./editor";

interface IState {
	editableId: number;
}

interface IProps {
	materials: Readonly<Api.IMaterial>[];
	list: Readonly<Api.IThickness>[];
	actions: any;
}

export class Producers extends React.Component<IProps, IState> {
	state = {
		editableId: null
	};

	onEdit(id: number) {
		this.setState({editableId: id});
	}

	onDelete(id: number) {
		if (this.props.materials.some(i => i.producerId === id)) {
			alert(`Элемент используеться в матерьялах: \n 
				${
				this.props.materials.filter(i => i.producerId === id)
					.map(i => i.caption + ',\n')
					.join('')
				}`);
		} else {
			this.props.actions.apiRemoveProducer(id);
		}
	}

	onSave(data: Api.IProducer) {
		this.props.actions.apiSaveProducers(data);
		this.onCancel();
	}

	onCancel() {
		this.setState({editableId: null});
	}

	onAddNewItem() {
		this.props.actions.apiAddNewProducer();
	}

	render() {
		return (
			<div>
				{
					this.props.list.map(i => (
						i.id === this.state.editableId
							? <Editor key={i.id}
									  item={i}
									  onSave={(d: Api.IProducer) => this.onSave(d)}
									  onCancel={() => this.onCancel()}/>
							: <Item key={i.id}
									item={i}
									onEdit={() => this.onEdit(i.id)}
									onDelete={() => this.onDelete(i.id)}/>
					))
				}
				<button onClick={() => this.onAddNewItem()}>Добавить</button>
			</div>
		)
	}
}

export default Producers;