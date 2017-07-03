import * as React from 'react';
import * as styles from './places.pcss';
import * as classnames from 'classnames';
import {RootState} from "reducers/index";
import {returntypeof} from 'react-redux-typescript';
import {mapDispatchToProps} from "actions";
import {connect} from 'react-redux';
import * as Button from 'muicss/lib/react/button';
import * as Checkbox from 'muicss/lib/react/checkbox';

interface IState {
	selectedIds: {
		[id: number]: boolean
	}
}

const mapStateToProps = (rootState: RootState) => ({
	details: rootState.api.details
});

const dispatchToProps = returntypeof(mapDispatchToProps);
const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & typeof dispatchToProps;

export class Places extends React.Component<Props, IState> {
	state = {
		selectedIds : {}
	};

	private editByPlaces(places: any): void {
		this.props.actions.app.editPlaces();
	}

	private onCheckItem (item: any, check: boolean): void {
		//this.props.actions.selectPlace({places: [item], selected: check});
	}

	private toggleDetails(id : number, check: boolean) {
		this.setState({
			selectedIds: {...this.state.selectedIds, [id]: check}
		});
	}
	private toggleSelectedAll() {
		this.setState({
			selectedIds: this.props.details.reduce((init, item) => {init[item.id] = true; return init}, {})
		});
	}

	render() {
		return (
			<div className={styles.areas}>
				<b>Выбор стекла</b>
				<ul>
					{
						this.props.details.map(item => {
							return (
								<li key={item.id}>
									<div className={classnames(styles.caption)}>

										<input
											name="isGoing"
											type="checkbox"

											checked={this.state.selectedIds[item.id]}
											onChange={(e) => this.toggleDetails(item.id, e.target.checked)} />
									</div>
									<div className={classnames(styles.label)}>
										Затемнение 80%/белый
									</div>
									<div className={classnames(styles.edit)}>
										<Button
													onClick={() => this.editByPlaces([item])}
													 label="edit"/>
									</div>
									<div className={classnames(styles.end)}>
										{/*<IconMenu
											touchTapCloseDelay={1}
											iconButtonElement={<IconButton
												iconStyle={{
													width: 24,
													height: 24,
												}}
												style={{
													width: 36,
													height: 36,
													padding: 0,
												}}
											><MoreVertIcon /></IconButton>}
											anchorOrigin={{horizontal: 'left', vertical: 'top'}}
											targetOrigin={{horizontal: 'left', vertical: 'top'}}
										>
											<MenuItem primaryText="Редактировать" onTouchTap={() => this.editByPlaces([item])}/>
											<MenuItem primaryText="Удалить заказ"/>
											<MenuItem primaryText="Приминить ко все стеклам"/>
											{this.props.details
												.filter(i => i.id !== item.id)
												.map(i => (<MenuItem key={item.id + i.id} primaryText={`Приминить на ${i.caption}`} />))
											}
										</IconMenu>*/}
									</div>
									<div className={classnames(styles.clr)}/>
								</li>
							);
						})
					}
				</ul>
				<div>
					<span className={classnames(styles.caption)}>
						<Checkbox
							label="Выбрать все"
							onChange={()=> this.toggleSelectedAll()}
						/>
					</span>
					<span className={classnames(styles.allEdit)}>
						{/*<FlatButton labelStyle={{textTransform: 'none'}}
									onClick={() => this.editByPlaces(this.props.details.filter(i => i.selected))}
									primary={true}
									disabled={!this.props.places.list.some(i=>i.selected)}
									label={`Редактировать выбранные (${this.props.places.list.filter(i=>i.selected).length})`}/>*/}
					</span>
				</div>
			</div>
		)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Places);

