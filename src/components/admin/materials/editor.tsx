import * as React from 'react';
import {Api} from "api";


interface IState {
}

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

export class Editor extends React.Component<IProps, IState> {
	render() {
		return (
			<div key={this.props.item.id}>
				<span>{this.props.item.id}</span>
				<input onChange={console.log} value={this.props.item.caption}/>
				<input onChange={console.log} value={this.props.item.price}/>
				<select>
					{
						this.props.producers.map(p => (
							<option key={p.id} value={p.id}>{p.caption}</option>
						))
					}
				</select>
				<select>
					<option key={-1} value={null}>Не выбрано</option>
					{
						this.props.colors.map(c => (
							<option key={c.id} value={c.id}>{c.caption}</option>
						))
					}
				</select>
				<select>
					<option key={-1} value={null}>Не выбрано</option>
					{
						this.props.thickness.map(c => (
							<option key={c.id} value={c.id}>{c.caption}</option>
						))
					}
				</select>

				<select>
					<option key={-1} value={null}>Не выбрано</option>
					{
						this.props.opacity.map(c => (
							<option key={c.id} value={c.id}>{c.caption}</option>
						))
					}
				</select>

				<select>
					{
						this.props.services.map(c => (
							<option key={c.id} value={c.id}>{c.caption}</option>
						))
					}
				</select>
				<button onClick={() => this.props.onSave(this.props.item)}>Сохранить</button>
				<button onClick={this.props.onCancel}>Отменить</button>
			</div>
		)
	}
}

export default Editor;