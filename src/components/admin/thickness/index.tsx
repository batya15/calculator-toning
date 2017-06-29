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
	list: Readonly<Api.IThickness>[];
	actions: ApiActionsType;
}

export class Thickness extends React.Component<IProps, IState> {
	state = {
		editableId: null
	};

	onEdit(id: number) {
		this.setState({editableId: id});
	}

	onDelete(id: number) {
		if (this.props.materials.some(i => i.thicknessId === id)) {
			alert(`Элемент используеться в матерьялах: \n 
				${
				this.props.materials.filter(i => i.thicknessId === id)
					.map(i => i.caption + ',\n')
					.join('')
				}`);
		} else {
			this.props.actions.apiRemoveThickness(id);
		}
	}

	onSave(data: Api.IThickness) {
		this.resetEditableItem();
		this.props.actions.apiSaveThickness(data);
	}

	resetEditableItem() {
		this.setState({editableId: null});
	}

	onAddNewItem() {
		this.props.actions.apiAddNewThickness();
	}

	render() {
		return (
			<div>
				{
					this.props.list.map(i => (
						i.id === this.state.editableId
							? <Editor key={i.id}
									  item={i}
									  onSave={(d: Api.IThickness) => this.onSave(d)}
									  onCancel={() => this.resetEditableItem()}/>
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

export default Thickness;