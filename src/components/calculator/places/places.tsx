import * as React from 'react';
import * as styles from './places.pcss';
import * as classnames from 'classnames';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FlatButton from 'material-ui/FlatButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {RootState} from "reducers/index";
import {returntypeof} from 'react-redux-typescript';
import {mapDispatchToProps} from "actions";
import {connect} from 'react-redux';
import {Place} from "reducers/places";

interface IState {}

const mapStateToProps = (rootState: RootState) => ({
	places: rootState.places
});

const dispatchToProps = returntypeof(mapDispatchToProps);
const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & typeof dispatchToProps;

export class Places extends React.Component<Props, IState> {
	componentDidMount(): void {
		this.props.actions.needPlaces();
	}

	private editByPlaces(places: Place[]): void {
		this.props.actions.editPlaces(places);
	}

	private onCheckItem (item: Place, check: boolean): void {
		this.props.actions.selectPlace({places: [item], selected: check});
	}

	private toggleSelectedAll() {
		this.props.actions.selectPlace({places: this.props.places.list, selected: !this.props.places.list.every(i => i.selected)});
	}

	render() {
		return (
			<div className={styles.areas}>
				<b>Выбор стекла</b>
				<ul>
					{
						this.props.places.list.map(item => {
							return (
								<li key={item.place.id}>
									<div className={classnames(styles.caption)}>
										<Checkbox
											label={item.place.caption}
											checked={item.selected}
											onCheck={(e,check) => this.onCheckItem(item, check)}
										/>
									</div>
									<div className={classnames(styles.label)}>
										Затемнение 80%/белый
									</div>
									<div className={classnames(styles.edit)}>
										<FlatButton labelStyle={{textTransform: 'none'}}
													onClick={() => this.editByPlaces([item])}
													primary={true} label="edit"/>
									</div>
									<div className={classnames(styles.end)}>
										<IconMenu
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
											{this.props.places.list
												.filter(i => i.place.id !== item.place.id)
												.map(i => (<MenuItem key={item.place.id + i.place.id} primaryText={`Приминить на ${i.place.caption}`} />))
											}
										</IconMenu>
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
							checked={this.props.places.list.every(i=>i.selected)}
							onCheck={()=> this.toggleSelectedAll()}
						/>
					</span>
					<span className={classnames(styles.allEdit)}>
						<FlatButton labelStyle={{textTransform: 'none'}}
									onClick={() => this.editByPlaces(this.props.places.list.filter(i => i.selected))}
									primary={true}
									disabled={!this.props.places.list.some(i=>i.selected)}
									label={`Редактировать выбранные (${this.props.places.list.filter(i=>i.selected).length})`}/>
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

