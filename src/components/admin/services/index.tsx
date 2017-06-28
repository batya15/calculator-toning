import * as React from 'react';
import {Api} from "api";
import {Item} from "./item";
import {Editor} from "./editor";
import {ApiActionsType} from "../../../actions/api";

interface IState {
	editableId: number;
}

interface IProps {
	materials: Readonly<Api.IMaterial>[];
	details: Readonly<Api.IDetail>[];
	list: Readonly<Api.IService>[];
	actions: ApiActionsType;
}

export class Services extends React.Component<IProps, IState> {
	state = {
		editableId: null
	};

	onEdit(id: number) {
		this.setState({editableId: id});
	}

	onDelete(id: number) {
		if (this.props.materials.some(i => i.serviceId === id) || this.props.details.some(i => i.serviceIDs.indexOf(id) >= 0)) {
			alert(`Элемент используеться в матерьялах: \n 
				${
				this.props.materials.filter(i => i.serviceId === id)
					.map(i => i.caption + ',\n')
					.join('')
				}
				Элемент используеться в деталях: \n 
				${
				this.props.details.filter(i => i.serviceIDs.indexOf(id) >= 0)
					.map(i => i.caption + ',\n')
					.join('')
				}
				`);
		} else {
			this.props.actions.apiRemoveService(id);
		}
	}

	onSave(data: Api.IService) {
		this.props.actions.apiSaveService(data);
		this.onCancel();
	}

	onCancel() {
		this.setState({editableId: null});
	}

	onAddNewItem() {
		this.props.actions.apiAddNewService();
	}

	render() {
		return (
			<div>
				{
					this.props.list.map(i => (
						i.id === this.state.editableId
							? <Editor key={i.id}
									  item={i}
									  onSave={(d: Api.IService) => this.onSave(d)}
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

export default Services;