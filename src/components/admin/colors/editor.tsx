import * as React from 'react';
import {Api} from "api";


interface IState {
}

interface IProps {
	item: Readonly<Api.IColor>,
	onSave: (data: Api.IColor) => void,
	onCancel: () => void
}

export class Editor extends React.Component<IProps, IState> {
	render() {
		console.log(this.props.item.rgb);
		return (
			<div key={this.props.item.id}>
				<span>{this.props.item.id}</span>
				<input onChange={console.log} value={this.props.item.caption}/>
				<input  type="color" onChange={console.log} value={this.props.item.rgb}/>
				<button onClick={()=> this.props.onSave(this.props.item)}>Сохранить</button>
				<button onClick={this.props.onCancel}>Отменить</button>
			</div>
		)
	}
}

export default Editor;