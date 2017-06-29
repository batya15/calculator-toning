import * as React from 'react';
import {Api} from "api";
import {Item} from "./item";
import {Editor} from "./editor";
import {ApiActionsType} from "actions/api";

interface IState {
	editableId: number;
}

interface IProps {
	list: Readonly<Api.IDetail>[];
	actions: ApiActionsType;
}

export class Details extends React.Component<IProps, IState> {
	state = {
		editableId: null
	};

	onEdit(id: number) {
		this.setState({editableId: id});
	}

	onDelete(id: number) {
		this.props.actions.apiRemoveDetail(id);
	}

	onSave(data: Api.IDetail) {
		this.props.actions.apiSaveDetail(data);
		this.resetEditableItem();
	}

	private resetEditableItem() {
		this.setState({editableId: null});
	}

	onAddNewItem() {
		this.props.actions.apiAddNewDetail();
	}

	render() {
		return (
			<div>
				{
					this.props.list.map(i => (
						i.id === this.state.editableId
							? <Editor key={i.id}
									  item={i}
									  onSave={(d: Api.IDetail) => this.onSave(d)}
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

export default Details;