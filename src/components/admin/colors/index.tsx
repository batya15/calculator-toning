import * as React from 'react';
import {Api} from "api";
import {Item} from "./item";
import {Editor} from "./editor";
import {ApiActionsType} from "actions/api";
import * as styles  from "./../admin.pcss";
import * as classnames  from 'classnames';
import * as Input from 'muicss/lib/react/input';
import * as Button from 'muicss/lib/react/button';

interface IState {
	editableId: number;
	searchString: RegExp;
}

interface IProps {
	materials: Readonly<Api.IMaterial>[];
	list: Readonly<Api.IColor>[];
	actions: ApiActionsType;
}

export class Colors extends React.Component<IProps, IState> {
	state = {
		editableId: null,
		searchString:null
	};

	private onEdit(id: number) {
		this.setState({editableId: id});
	}

	private onDelete(id: number) {
		if (this.props.materials.some(i => i.colorId === id)) {
			alert(`Элемент используеться в матерьялах: \n 
				${
				this.props.materials.filter(i => i.colorId === id)
					.map(i => i.caption + ',\n')
					.join('')
				}`);
		} else {
			this.props.actions.apiRemoveColor(id);
		}
	}

	private onSave(data: Api.IColor) {
		this.props.actions.apiSaveColor(data);
		this.resetEditableItem();
	}

	private onSearch(search: string) {
		if (search === '') {
			this.setState({searchString: null});
		} else {
			let req = search.split(' ').reduce((res, i) => res += `(?=.*${i})`, '');
			this.setState({searchString: new RegExp(`^${req}.*$`, 'i')});
		}
	}

	private resetEditableItem() {
		this.setState({editableId: null});
	}

	private onAddNewItem() {
		this.props.actions.apiAddNewColor();
	}

	render() {
		return (
			<div className={classnames({[styles.editable]: this.state.editableId !== null, [styles.list]: true})}>
				<Input hint="Поиск..."
					   onChange={e => this.onSearch(e.target.value)}/>
				{
					this.props.list
						.filter(i => this.state.searchString === null? true : this.state.searchString.test(i.caption + i.rgb))
						.map(i => (
							i.id === this.state.editableId
								? <Editor key={i.id}
										  item={i}
										  onSave={(d: Api.IColor) => this.onSave(d)}
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
