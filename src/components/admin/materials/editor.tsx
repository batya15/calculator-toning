import * as React from 'react';
import {Api} from "api";
import * as commonStyle from "./../admin.pcss";
import * as customStyle from "./materials.pcss";
import * as Button from 'muicss/lib/react/button';
import * as Input from 'muicss/lib/react/input';
import * as classnames  from 'classnames';
import * as Select from 'react-select';
import 'react-select/dist/react-select.css';

interface IProps {
	item: Readonly<Api.IMaterial>,
	services: Readonly<Api.IService>[];
	producers: Readonly<Api.IProducer>[];
	colors: Readonly<Api.IColor>[];
	opacity: Readonly<Api.IOpacity>[];
	thickness: Readonly<Api.IThickness>[];
	details: Readonly<Api.IDetail>[];
	onSave?: (data: Api.IMaterial) => void,
	onCancel?: () => void
}

export class Editor extends React.Component<IProps, Api.IMaterial> {
	public componentWillMount(): void {
		this.propsToState(this.props.item);
	}

	public componentWillReceiveProps(nextProps: IProps): void {
		this.propsToState(nextProps.item);
	}

	/**
	 * Запись элемента в state для редактирования
	 * @param item
	 */
	private propsToState(item: Api.IMaterial) {
		this.setState({...item})
	}

	render() {
		return (
			<div className={classnames(commonStyle.editor, customStyle.main)}>
				<div className={customStyle.side}>
					<div className={commonStyle.id}>id: #{this.state.id}</div>
					<Input label="Название пленки:"
						   onChange={(e) => this.setState({caption: e.target.value})}
						   value={this.state.caption}/>
					<Input label="Цена за 1 кв.м."
						   type="number"
						   onChange={(e) => this.setState({price: Number(e.target.value)})}
						   value={this.state.price}/>
					<div className={commonStyle.id}>Услуга:</div>
					<Select
						className={customStyle.reset}
						placeholder="Отсутствует данный параметр"
						simpleValue
						clearable={false}
						value={this.state.serviceId}
						options={this.props.services.map(i => ({value: i.id, label: i.caption}))}
						onChange={e => this.setState({serviceId: e})}
					/>
					<div className={commonStyle.id}>Производитель:</div>
					<Select
						className={customStyle.reset}
						placeholder="Выбор производителя..."
						clearable={false}
						simpleValue
						value={this.state.producerId}
						options={this.props.producers.map(i => ({value: i.id, label: i.caption}))}
						onChange={e => this.setState({producerId: e})}
					/>
					<div className={commonStyle.id}>Цвет:</div>
					<Select
						className={customStyle.reset}
						placeholder="Отсутствует данный параметр"
						simpleValue
						value={this.state.colorId}
						options={this.props.colors.map(i => ({value: i.id, label: i.caption}))}
						onChange={e => this.setState({colorId: e})}
					/>
					<div className={commonStyle.id}>Толщина:</div>
					<Select
						className={customStyle.reset}
						placeholder="Отсутствует данный параметр"
						simpleValue
						value={this.state.thicknessId}
						options={this.props.thickness.map(i => ({value: i.id, label: i.caption}))}
						onChange={e => this.setState({thicknessId: e})}
					/>
					<div className={commonStyle.id}>Светопропускаемость:</div>
					<Select
						className={customStyle.reset}
						placeholder="Отсутствует данный параметр"
						simpleValue
						value={this.state.opacityId}
						options={this.props.opacity.map(i => ({value: i.id, label: i.caption}))}
						onChange={e => this.setState({opacityId: e})}
					/>
				</div>
				<div className={customStyle.side}>
					<div className={customStyle.calculator}>
						<div className={commonStyle.id}>Калькулятор:</div>
						{
							this.props.details.map(i => (
								<div className={customStyle.detail} key={i.id}>
									<span className={customStyle.caption}>{i.caption}:</span>
									<span  className={customStyle.price}>{i.size * this.state.price}</span>
								</div>
							))
						}
					</div>
				</div>
				<div className={classnames(commonStyle.controls, customStyle.clr)}>
					<Button size="small"
							className={commonStyle.save}
							color="primary"
							onClick={() => this.props.onSave(this.state)}>Сохранить</Button>
					<Button size="small"
							className={commonStyle.cancel}
							color="primary"
							onClick={this.props.onCancel}>Отменить</Button>
				</div>
			</div>
		)
	}
}

export default Editor;