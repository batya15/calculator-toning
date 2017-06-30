import * as React from 'react';
import {Api} from "api";
import * as commonStyle from "./../admin.pcss";
import * as customStyle from "./services.pcss";
import * as Button from 'muicss/lib/react/button';
import * as Input from 'muicss/lib/react/input';
import * as classnames  from 'classnames';

interface IProps {
	item: Readonly<Api.IService>,
	onSave: (data: Api.IService) => void,
	onCancel: () => void
}

export class Editor extends React.Component<IProps, Api.IService> {
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
	private propsToState(item: Api.IService) {
		this.setState({...item});
	}

	private onChangeCaption(caption: string) {
		this.setState({caption: caption})
	}

	private onChangeDescription(caption: string) {
		this.setState({description: caption})
	}

	render() {
		return (
			<div className={classnames(commonStyle.editor, customStyle.main)}>
				<div className={commonStyle.id}>id: #{this.state.id}</div>
				<Input label="Название услуги:"
					   onChange={(e) => this.setState({caption: e.target.value})}
					   value={this.state.caption}/>
				<Input label="Описание услуги:"
					   onChange={(e) => this.setState({description: e.target.value})}
					   value={this.state.description}/>
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