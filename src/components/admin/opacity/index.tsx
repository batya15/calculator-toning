import * as React from 'react';
import {Api} from "api";
import {Item} from "./item";
import {Editor} from "./editor";
import {ApiActionsType} from "actions/api";
import * as styles  from "./../admin.pcss";
import * as classnames  from 'classnames';
import * as Input from 'muicss/lib/react/input';
import * as Button from 'muicss/lib/react/button';
import {Map} from 'immutable';

interface IState {
	editableId: number;
	searchString: RegExp;
}

interface IProps {
	materials: Map<number, Api.IMaterial>;
	list: Map<number, Api.IOpacity>;
	actions: ApiActionsType;
}

export class Opacity extends React.Component<IProps, IState> {
	state = {
		editableId: null,
		searchString: null
	};

	private onEdit(id: number) {
		this.setState({editableId: id});
	}

	private onDelete(id: number) {
		if (this.props.materials.some(i => i.opacityId === id)) {
			alert(`Элемент используеться в матерьялах: \n 
				${
				this.props.materials.filter(i => i.opacityId === id)
					.map(i => i.caption + ',\n')
					.join('')
				}`);
		} else {
			this.props.actions.apiRemoveOpacity(id);
		}
	}

	private onSave(data: Api.IOpacity) {
		this.props.actions.apiSaveOpacity(data);
		this.resetEditableItem();
	}

	private onSearch(search: string) {
		if (search === '') {
			this.setState({searchString: null});
		} else {
			this.setState({searchString: new RegExp(search, 'i')});
		}
	}

	private resetEditableItem() {
		this.setState({editableId: null});
	}

	private onAddNewItem() {
		this.props.actions.apiAddNewOpacity();
	}

	render() {
		return (
			<div className={classnames({[styles.editable]: this.state.editableId !== null, [styles.list]: true})}>
				<Input hint="Поиск..." onChange={e => this.onSearch(e.target.value)}/>
				{
					this.props.list
						.toArray()
						.filter(i => this.state.searchString === null? true : this.state.searchString.test(i.caption))
						.map(i => (
							i.id === this.state.editableId
								? <Editor key={i.id}
										  item={i}
										  onSave={(d: Api.IOpacity) => this.onSave(d)}
										  onCancel={() => this.resetEditableItem()}/>
								: <Item key={i.id}
										item={i}
										onEdit={() => this.onEdit(i.id)}
										onDelete={() => this.onDelete(i.id)}/>
						))
				}
				<Button className={styles.add}
						variant="fab"
						color="primary"
						onClick={() => this.onAddNewItem()}>+</Button>
			</div>
		)
	}
}