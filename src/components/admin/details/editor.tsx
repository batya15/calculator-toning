import * as React from 'react';
import {Api} from "api";


interface IProps {
	item: Readonly<Api.IDetail>,
	onSave: (data: Api.IDetail) => void,
	onCancel: () => void
}

export class Editor extends React.Component<IProps, Api.IDetail> {
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
	private propsToState(item: Api.IDetail) {
		this.setState({...item})
	}

	private onChangeCaption(caption: string) {
		this.setState({caption: caption})
	}

	private onChangeMeshName(meshName: string) {
		this.setState({meshName: meshName})
	}

	private onChangeSize(size: number) {
		this.setState({size: size})
	}

	private onChangeCameraPosition(pos: string) {
		this.setState({cameraPosition: pos})
	}

	render() {
		return (
			<div key={this.state.id}>
				<span>{this.state.id}</span>
				<input onChange={(e) => this.onChangeCaption(e.target.value)} value={this.state.caption}/>
				<input onChange={(e) => this.onChangeSize(e.target.value)} value={this.state.size}/>
				<input onChange={(e) => this.onChangeMeshName(e.target.value)} value={this.state.meshName}/>
				<input onChange={(e) => this.onChangeCameraPosition(e.target.value)} value={this.state.cameraPosition}/>
				<input onChange={console.log} value={this.state.serviceIDs.join()}/>
				<button onClick={()=> this.props.onSave(this.state)}>Сохранить</button>
				<button onClick={this.props.onCancel}>Отменить</button>
			</div>
		)
	}
}

export default Editor;