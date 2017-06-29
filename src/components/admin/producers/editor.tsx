import * as React from 'react';
import {Api} from "api";

interface IProps {
	item: Readonly<Api.IProducer>,
	onSave: (data: Api.IProducer) => void,
	onCancel: () => void
}

export class Editor extends React.Component<IProps, Api.IProducer> {
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
	private propsToState(item: Api.IProducer) {
		this.setState({...item})
	}
	private onChangeCaption(caption: string) {
		this.setState({caption: caption})
	}
	render() {
		return (
			<div key={this.state.id}>
				<span>{this.state.id}</span>
				<input onChange={(e) => this.onChangeCaption(e.target.value)} value={this.state.caption}/>
				<button onClick={()=> this.props.onSave(this.state)}>Сохранить</button>
				<button onClick={this.props.onCancel}>Отменить</button>
			</div>
		)
	}
}

export default Editor;