import * as React from 'react';
import * as styles from './places.pcss';
import * as classnames from 'classnames';
import {RootState} from "reducers/index";
import {returntypeof} from 'react-redux-typescript';
import {mapDispatchToProps} from "actions";
import {connect} from 'react-redux';
import * as Button from 'muicss/lib/react/button';
import * as Checkbox from 'muicss/lib/react/checkbox';
import * as Dropdown from 'react-menu-list/js/Dropdown';
import * as MenuButton from 'react-menu-list/js/MenuButton';

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
		selectedIds: {}
	};

	private editByIds(ids: number[]): void {
		this.props.actions.app.editOrders(ids);
	}

	private editSelectedDetails() {
		let ids = [];
		for (let i in this.state.selectedIds) {
			if (this.state.selectedIds.hasOwnProperty(i) && this.state.selectedIds[i] === true) {
				ids.push(parseInt(i));
			}
		}
		this.editByIds(ids);
	}

	private toggleDetails(id: number, check: boolean) {
		this.setState({
			selectedIds: {...this.state.selectedIds, [id]: check}
		});
	}

	private toggleSelectedAll(checked: boolean): void {
		this.setState({
			selectedIds: this.props.details.reduce((init, item) => {
				init[item.id] = checked;
				return init
			}, {})
		});
	}

	private allDetailsSelected(): boolean {
		return Places.objectValues(this.state.selectedIds).filter(i => i).length === this.props.details.size;
	}

	static objectValues(obj: any): string[] {
		let result = [];
		for (let key in obj) {
			if (obj.hasOwnProperty(key)) {
				result.push(obj[key]);
			}
		}
		return result;
	}

	render() {
		let countSelected = Places.objectValues(this.state.selectedIds).filter(i => i).length;
		return (
			<div className={styles.areas}>
				<div className={styles.title}>Выбор стекла</div>
				<ul className={styles.details}>
					{this.props.details.toArray().map(item => {
						return (
							<li key={item.id}
								className={classnames({
									[styles.detail]: true,
									[styles.selected]: !!this.state.selectedIds[item.id]
								})}
								onClick={(e) => this.toggleDetails(item.id, !this.state.selectedIds[item.id])}
							>
								<div className={classnames(styles.caption)}>
									<div
										className={classnames({
											[styles.checkbox]: true,
											[styles.checked]: !!this.state.selectedIds[item.id]
										})}
									/>
									<span className={styles.name}>
										{item.caption}
									</span>
								</div>
								<div className={classnames(styles.label)}>
									{"function render informations"}
								</div>
								<div className={classnames(styles.controls)} onClick={e=> e.stopPropagation()}>
									<Button
										size="small"
										color="primary"
										variant="flat"
										className={styles.btn}
										onClick={(e) => {
											e.stopPropagation();
											this.editByIds([item.id])
										}}
									>
										<i className="material-icons">mode_edit</i>
									</Button>
									<MenuButton
										ButtonComponent='span'
										menu={
											<Dropdown>
												<div onClick={() => this.editByIds([item.id])}>Редактировать</div>
												<div onClick={() => this.props.actions.app.removeOrders([item.id])}>
													Удалить заказ
												</div>
												<div onClick={() => console.log('Приминить ко все стеклам')}>
													Приминить ко все стеклам
												</div>
												{this.props.details
													.toArray()
													.filter(i => i.id !== item.id)
													.map(i => (
														<div
															key={item.id + i.id}
															onClick={() => console.log(`Приминить на ${i.caption}`)}>
															Приминить на {i.caption}
														</div>))
												}
											</Dropdown>
										}
									>
										<Button
											size="small"
											className={styles.btn}
											variant="flat"
										><i className="material-icons">menu</i></Button>
									</MenuButton>
								</div>
							</li>
						);
					})
					}
				</ul>
				<div>
					<span className={classnames(styles.caption)}>
						<Checkbox
							label="Выбрать все"
							checked={this.allDetailsSelected()}
							onChange={(e) => this.toggleSelectedAll(e.target.checked)}
						/>
					</span>
					<span className={classnames(styles.allEdit)}>
						<button
							onClick={() => this.editSelectedDetails()}
							disabled={countSelected === 0}
						>Редактировать выбранные ({countSelected})</button>
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

