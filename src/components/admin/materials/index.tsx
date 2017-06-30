import * as React from 'react';
import {Api} from "api";
import {Item} from "./item";
import {Editor} from "./editor";
import {ApiActionsType} from "actions/api";
import * as styles  from "./../admin.pcss";
import * as classnames  from 'classnames';
import * as Input from 'muicss/lib/react/input';
import * as Button from 'muicss/lib/react/button';

interface IState {
	editableId: number;
	searchString: RegExp;
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
		editableId: null,
		searchString: null
	};

	private onEdit(id: number) {
		this.setState({editableId: id});
	}

	private onDelete(id: number) {
		this.props.actions.apiRemoveMaterial(id);
	}

	private onSave(data: Api.IMaterial) {
		this.props.actions.apiSaveMaterial(data);
		this.resetEditableItem();
	}

	private resetEditableItem() {
		this.setState({editableId: null});
	}

	private onSearch(search: string) {
		if (search === '') {
			this.setState({searchString: null});
		} else {
			this.setState({searchString: new RegExp(search, 'gi')});
		}
	}

	private onAddNewItem() {
		this.props.actions.apiAddNewMaterial();
	}

	render() {
		return (
			<div className={classnames({[styles.editable]: this.state.editableId !== null, [styles.list]: true})}>
				<Input hint="Поиск..." onChange={e => this.onSearch(e.target.value)}/>
				{
					this.props.list
						.filter(i => this.state.searchString === null ? true : this.state.searchString.test(i.caption))
						.map(i => (
							i.id === this.state.editableId
								? <Editor key={i.id}
										  item={i}
										  services={this.props.services}
										  producers={this.props.producers}
										  colors={this.props.colors}
										  opacity={this.props.opacity}
										  thickness={this.props.thickness}
										  onSave={(d: Api.IMaterial) => this.onSave(d)}
										  onCancel={() => this.resetEditableItem()}/>
								: <Item key={i.id}
										item={i}
										service={this.props.services.filter(s => s.id === i.serviceId)[0]}
										producer={this.props.producers.filter(s => s.id === i.producerId)[0]}
										color={this.props.colors.filter(s => s.id === i.colorId)[0]}
										opacity={this.props.opacity.filter(s => s.id === i.opacityId)[0]}
										thickness={this.props.thickness.filter(s => s.id === i.thicknessId)[0]}
										onEdit={() => this.onEdit(i.id)}
										onDelete={() => this.onDelete(i.id)}/>
						))
				}
				<Button className={styles.add} variant="fab" color="primary" onClick={() => this.onAddNewItem()}>+</Button>
			</div>
		)
	}
}
