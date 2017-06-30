import * as React from 'react';
import {Api} from "api";
import {Item} from "./item";
import {Editor} from "./editor";
import {ApiActionsType} from "actions/api";
import * as styles  from "./../admin.pcss";
import * as customStyle from "./materials.pcss";
import * as classnames  from 'classnames';
import * as Input from 'muicss/lib/react/input';
import * as Button from 'muicss/lib/react/button';
import * as Select from 'react-select';
import 'react-select/dist/react-select.css';

interface IState {
	editableId: number;
	searchString: RegExp;
	searchServiceId: number;
	searchProducerId: number;
	searchColorId: number;
	searchThicknessId: number;
	searchOpacityId: number;
}

interface IProps {
	list: Readonly<Api.IMaterial>[];
	services: Readonly<Api.IService>[];
	colors: Readonly<Api.IColor>[];
	opacity: Readonly<Api.IOpacity>[];
	thickness: Readonly<Api.IThickness>[];
	producers: Readonly<Api.IProducer>[];
	details: Readonly<Api.IDetail>[];
	actions: ApiActionsType;
}

export class Materials extends React.Component<IProps, IState> {
	state = {
		editableId: null,
		searchString: null,
		searchServiceId: null,
		searchProducerId: null,
		searchColorId: null,
		searchOpacityId: null,
		searchThicknessId: null
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
			this.setState({searchString: new RegExp(search, 'i')});
		}
	}

	private onAddNewItem() {
		if (this.props.producers.length === 0) {
			alert('Ошибка! Нет ни одного производителя!')
		} else if (this.props.services.length === 0) {
			alert('Ошибка! Нет ни одной услуги!')
		} else {
			this.props.actions.apiAddNewMaterial({producerId: this.props.producers[0].id, serviceId: this.props.services[0].id});
		}
	}

	render() {
		return (
			<div className={classnames({[styles.editable]: this.state.editableId !== null, [styles.list]: true})}>
				<div className={customStyle.searchPanel}>
					<Input hint="Поиск..." onChange={e => this.onSearch(e.target.value)}/>
					<Select
						className={classnames(customStyle.reset, customStyle.searchSelect)}
						placeholder="Сервис"
						simpleValue
						value={this.state.searchServiceId}
						options={this.props.services.map(i => ({value: i.id, label: i.caption}))}
						onChange={e => this.setState({searchServiceId: e})}
					/>
					<Select
						className={classnames(customStyle.reset, customStyle.searchSelect)}
						placeholder="Производитель"
						simpleValue
						value={this.state.searchProducerId}
						options={this.props.producers.map(i => ({value: i.id, label: i.caption}))}
						onChange={e => this.setState({searchProducerId: e})}
					/>
					<Select
						className={classnames(customStyle.reset, customStyle.searchSelect)}
						placeholder="Цвет"
						simpleValue
						value={this.state.searchColorId}
						options={this.props.colors.map(i => ({value: i.id, label: i.caption}))}
						onChange={e => this.setState({searchColorId: e})}
					/>
					<Select
						className={classnames(customStyle.reset, customStyle.searchSelect)}
						placeholder="Толщина"
						simpleValue
						value={this.state.searchThicknessId}
						options={this.props.thickness.map(i => ({value: i.id, label: i.caption}))}
						onChange={e => this.setState({searchThicknessId: e})}
					/>
					<Select
						className={classnames(customStyle.reset, customStyle.searchSelect)}
						placeholder="Светопропускаемость"
						simpleValue
						value={this.state.searchOpacityId}
						options={this.props.opacity.map(i => ({value: i.id, label: i.caption}))}
						onChange={e => this.setState({searchOpacityId: e})}
					/>
				</div>
				{
					this.props.list
						.filter(i => this.state.searchString === null || this.state.searchString.test(i.caption))
						.filter(i => this.state.searchColorId === null || this.state.searchColorId === i.colorId)
						.filter(i => this.state.searchOpacityId === null || this.state.searchOpacityId === i.opacityId)
						.filter(i => this.state.searchProducerId === null || this.state.searchProducerId === i.producerId)
						.filter(i => this.state.searchServiceId === null || this.state.searchServiceId === i.serviceId)
						.filter(i => this.state.searchThicknessId === null || this.state.searchThicknessId === i.thicknessId)
						.map(i => (
							i.id === this.state.editableId
								? <Editor key={i.id}
										  item={i}
										  details={this.props.details}
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
				<Button className={styles.add} variant="fab" color="primary"
						onClick={() => this.onAddNewItem()}>+</Button>
			</div>
		)
	}
}
