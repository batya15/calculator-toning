import * as React from 'react';
import {Api} from "api";


interface IState {
}

interface IProps {
	item: Readonly<Api.IDetail>,
	onSave: (data: Api.IDetail) => void,
	onCancel: () => void
}

export class Editor extends React.Component<IProps, IState> {
	render() {
		return (
			<div key={this.props.item.id}>
				<span>{this.props.item.id}</span>
				<input onChange={console.log} value={this.props.item.caption}/>
				<input onChange={console.log} value={this.props.item.size}/>
				<input onChange={console.log} value={this.props.item.meshName}/>
				<input onChange={console.log} value={this.props.item.cameraPosition}/>
				<input onChange={console.log} value={this.props.item.serviceIDs.join()}/>
				<button onClick={()=> this.props.onSave(this.props.item)}>Сохранить</button>
				<button onClick={this.props.onCancel}>Отменить</button>
			</div>
		)
	}
}

export default Editor;