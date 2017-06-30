import * as React from 'react';
import {Api} from "api";
import * as commonStyle from "./../admin.pcss";
import * as customStyle from "./opacity.pcss";
import * as Button from 'muicss/lib/react/button';
import * as Input from 'muicss/lib/react/input';
import * as classnames  from 'classnames';

interface IProps {
	item: Readonly<Api.IOpacity>,
	onSave: (data: Api.IOpacity) => void,
	onCancel: () => void
}

export class Editor extends React.Component<IProps, Api.IOpacity> {
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
	private propsToState(item: Api.IOpacity) {
		this.setState({...item})
	}

	render() {
		return (
			<div className={classnames(commonStyle.editor, customStyle.main)}>
				<div className={commonStyle.id}>id: #{this.state.id}</div>
				<Input label="Название прозрачности:"
					   onChange={(e) => this.setState({caption: e.target.value})}
					   value={this.state.caption}/>
				<div className={commonStyle.controls}>
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