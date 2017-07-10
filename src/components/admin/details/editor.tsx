import * as React from 'react';
import {Api} from "api";
import * as commonStyle from "./../admin.pcss";
import * as customStyle from "./details.pcss";
import * as Button from 'muicss/lib/react/button';
import * as Input from 'muicss/lib/react/input';
import * as classnames  from 'classnames';
import * as Select from 'react-select';
import 'react-select/dist/react-select.css';
import {MapService} from "../../../reducers/api/index";


interface IProps {
	item: Readonly<Api.IDetail>,
	services: MapService,
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
		this.setState({...item});
	}

	render() {
		return (
			<div className={classnames(commonStyle.editor, customStyle.main)}>
				<div className={commonStyle.id}>id: #{this.state.id}</div>
				<Input label="Название детали:"
					   onChange={(e) => this.setState({caption: e.target.value})}
					   value={this.state.caption}/>
				<Input label="Площадь детали:"
					   type="number"
					   onChange={(e) => this.setState({size: e.target.value})}
					   value={this.state.size}/>
				<Input label="Идентификатор 3d:"
					   onChange={(e) => this.setState({meshName: e.target.value})}
					   value={this.state.meshName}/>
				<Input label="Позиция камеры 3d:"
					   onChange={(e) => this.setState({cameraPosition: e.target.value})}
					   value={this.state.cameraPosition}/>
				<div className={commonStyle.id}>Возможные проводимые услуги для данной детали:</div>
				<div className={customStyle.selectService}>
					<Select
						placeholder="Выбор услуг..."
						value={this.state.serviceIDs}
						multi={true}
						options={this.props.services.toArray().map(i => ({value: i.id, label: i.caption}))}
						onChange={(e) => this.setState({serviceIDs: e.map(s => s.value)})}
					/>
				</div>
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