import * as React from 'react';
import {Api} from "api";
import {Item} from "./item";
import {Editor} from "./editor";
import {ApiActionsType} from "actions/api";

interface IState {
	editableId: number;
}

interface IProps {
	list: Readonly<Api.IMaterial>[];
	services: Readonly<Api.IService>[];
	colors: Readonly<Api.IColor>[];
	opacity: Readonly<Api.IOpacity>[];
	thickness: Readonly<Api.IThickness>[];
	producers: Readonly<Api.IProducer>[];

	actions: ApiActionsType;
}

export class Materials extends React.Component<IProps, IState> {
	state = {
		editableId: null
	};

	onEdit(id: number) {
		this.setState({editableId: id});
	}

	onDelete(id: number) {
		this.props.actions.apiRemoveMaterial(id);
	}

	onSave(data: Api.IMaterial) {
		this.props.actions.apiSaveMaterial(data);
		this.onCancel();
	}

	onCancel() {
		this.setState({editableId: null});
	}

	onAddNewItem() {
		this.props.actions.apiAddNewMaterial();
	}

	render() {
		return (
			<div>
				{
					this.props.list.map(i => (
						i.id === this.state.editableId
							? <Editor key={i.id}
									  item={i}
									  services={this.props.services}
									  producers={this.props.producers}
									  colors={this.props.colors}
									  opacity={this.props.opacity}
									  thickness={this.props.thickness}
									  onSave={(d: Api.IMaterial) => this.onSave(d)}
									  onCancel={() => this.onCancel()}/>
							: <Item key={i.id}
									item={i}
									service={this.props.services.filter(s=> s.id === i.serviceId)[0]}
									producer={this.props.producers.filter(s=> s.id === i.producerId)[0]}
									color={this.props.colors.filter(s=> s.id === i.colorId)[0]}
									opacity={this.props.opacity.filter(s=> s.id === i.opacityId)[0]}
									thickness={this.props.thickness.filter(s=> s.id === i.thicknessId)[0]}
									onEdit={() => this.onEdit(i.id)}
									onDelete={() => this.onDelete(i.id)}/>
					))
				}
				<button onClick={() => this.onAddNewItem()}>Добавить</button>
			</div>
		)
	}
}

export default Materials;