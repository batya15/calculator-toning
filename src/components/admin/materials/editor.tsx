import * as React from 'react';
import {Api} from "api";


interface IProps {
	item: Readonly<Api.IMaterial>,
	services?: Readonly<Api.IService>[];
	producers?: Readonly<Api.IProducer>[];
	colors?: Readonly<Api.IColor>[];
	opacity?: Readonly<Api.IOpacity>[];
	thickness?: Readonly<Api.IThickness>[];
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
			<div key={this.props.item.id}>
				<span>{this.props.item.id}</span>
				<input onChange={(e) => this.setState({caption: e.target.value})} value={this.state.caption}/>
				<input type="number" onChange={(e) => this.setState({price: Number(e.target.value)})} value={this.state.price}/>
				<select value={this.state.producerId} onChange={(e) => this.setState({producerId: Number(e.target.value)})}>
					{
						this.props.producers.map(p => (
							<option key={p.id} value={p.id}>{p.caption}</option>
						))
					}
				</select>
				<select value={this.state.colorId ? this.state.colorId : ''} onChange={(e) => this.setState({colorId: e.target.value !== '' ? Number(e.target.value) : null})}>
					<option value=''>Не выбрано</option>
					{
						this.props.colors.map(c => (
							<option key={c.id} value={c.id}>{c.caption}</option>
						))
					}
				</select>
				<select value={this.state.thicknessId ? this.state.thicknessId : ''} onChange={(e) => this.setState({thicknessId: e.target.value !== '' ? Number(e.target.value) : null})}>
					<option value=''>Не выбрано</option>
					{
						this.props.thickness.map(c => (
							<option key={c.id} value={c.id}>{c.caption}</option>
						))
					}
				</select>

				<select value={this.state.opacityId ? this.state.opacityId : ''} onChange={(e) => this.setState({opacityId: e.target.value !== '' ? Number(e.target.value) : null})}>
					<option value={null}>Не выбрано</option>
					{
						this.props.opacity.map(c => (
							<option key={c.id} value={c.id}>{c.caption}</option>
						))
					}
				</select>

				<select value={this.state.serviceId ? this.state.serviceId : ''} onChange={(e) => this.setState({serviceId: e.target.value !== '' ? Number(e.target.value) : null})}>
					{
						this.props.services.map(c => (
							<option key={c.id} value={c.id}>{c.caption}</option>
						))
					}
				</select>
				<button onClick={() => this.props.onSave(this.state)}>Сохранить</button>
				<button onClick={this.props.onCancel}>Отменить</button>
			</div>
		)
	}
}

export default Editor;