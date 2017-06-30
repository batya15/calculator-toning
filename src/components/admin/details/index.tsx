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
	list: Readonly<Api.IDetail>[];
	services: Readonly<Api.IService>[];
	actions: ApiActionsType;
}

export class Details extends React.Component<IProps, IState> {
	state = {
		editableId: null,
		searchString: null
	};

	private onEdit(id: number) {
		this.setState({editableId: id});
	}

	private onDelete(id: number) {
		this.props.actions.apiRemoveDetail(id);
	}

	private onSave(data: Api.IDetail) {
		this.props.actions.apiSaveDetail(data);
		this.resetEditableItem();
	}

	private resetEditableItem() {
		this.setState({editableId: null});
	}

	private onSearch(search: string) {
		if (search === '') {
			this.setState({searchString: null});
		} else {
			this.setState({searchString: new RegExp(search, 'gi')});
		}
	}

	private onAddNewItem() {
		this.props.actions.apiAddNewDetail();
	}

	render() {
		return (
			<div className={classnames({[styles.editable]: this.state.editableId !== null, [styles.list]: true})}>
				<Input hint="Поиск..."
					   onChange={e => this.onSearch(e.target.value)}/>
				{
					this.props.list
						.filter(i => this.state.searchString === null? true : this.state.searchString.test(i.caption + i.size))
						.map(i => (
							i.id === this.state.editableId
								? <Editor key={i.id}
										  item={i}
										  services={this.props.services}
										  onSave={(d: Api.IDetail) => this.onSave(d)}
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

export default Details;