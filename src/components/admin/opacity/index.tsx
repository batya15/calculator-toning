import * as React from 'react';
import {Api} from "api";
import {Item} from "./item";
import {Editor} from "./editor";
import {ApiActionsType} from "actions/api";

interface IState {
	editableId: number;
}

interface IProps {
	materials: Readonly<Api.IMaterial>[];
	list: Readonly<Api.IOpacity>[];
	actions: ApiActionsType;
}

export class Opacity extends React.Component<IProps, IState> {
	state = {
		editableId: null
	};

	onEdit(id: number) {
		this.setState({editableId: id});
	}

	onDelete(id: number) {
		if (this.props.materials.some(i => i.opacityId === id)) {
			alert(`Элемент используеться в матерьялах: \n 
				${
				this.props.materials.filter(i => i.opacityId === id)
					.map(i => i.caption + ',\n')
					.join('')
				}`);
		} else {
			this.props.actions.apiRemoveOpacity(id);
		}
	}

	onSave(data: Api.IOpacity) {
		this.props.actions.apiSaveOpacity(data);
		this.onCancel();
	}

	onCancel() {
		this.setState({editableId: null});
	}

	onAddNewItem() {
		this.props.actions.apiAddNewOpacity();
	}

	render() {
		return (
			<div>
				{
					this.props.list.map(i => (
						i.id === this.state.editableId
							? <Editor key={i.id}
									  item={i}
									  onSave={(d: Api.IOpacity) => this.onSave(d)}
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

export default Opacity;