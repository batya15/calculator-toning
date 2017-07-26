import * as React from 'react';
import * as styles from './places.pcss';
import * as classnames from 'classnames';
import {RootState} from "reducers/index";
import {returntypeof} from 'react-redux-typescript';
import {mapDispatchToProps} from "actions";
import {connect} from 'react-redux';
import * as Button from 'muicss/lib/react/button';
import * as Dropdown from 'react-menu-list/js/Dropdown';
import * as MenuButton from 'react-menu-list/js/MenuButton';
import {Api} from "api";
import {STEP} from "../../../reducers/step";

interface IState {
	selectedIds: {
		[id: number]: boolean
	}
}

const mapStateToProps = (rootState: RootState) => ({
	details: rootState.api.details,
	materials: rootState.api.materials,
	services: rootState.api.services,
	producers: rootState.api.producers,
	opacity: rootState.api.opacity,
	thickness: rootState.api.thickness,
	colors: rootState.api.colors,
	orders: rootState.orders,
	step: rootState.step
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

	private getTitleMaterial(item: Api.IDetail): string {
		let result = '';
		let order = this.props.orders.get(item.id);
		if (order && order.materialId) {
			let material = this.props.materials.get(order.materialId);
			result += this.props.services.get(material.serviceId).caption;
			result += ' / ' + this.props.producers.get(material.producerId).caption;
			if (material.opacityId) {
				result += ' / ' + this.props.opacity.get(material.opacityId).caption;
			}
			if (material.thicknessId) {
				result += ' / ' + this.props.thickness.get(material.thicknessId).caption;
			}
			if (material.colorId) {
				result += ' / ' + this.props.colors.get(material.colorId).caption;
			}
			result += ' / ' + (material.price * item.size) + 'p.';
		}
		return result;
	}

	private applyMaterial(id: number[], materialId: number) {
		this.props.actions.app.editOrders(id);
		this.props.actions.app.save(materialId);
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

	shouldComponentUpdate(nextProps, nextState): boolean {
		return nextProps.step === STEP.DETAILS;
	}

	render() {
		let countSelected = Places.objectValues(this.state.selectedIds).filter(i => i).length;
		return (
			<div className={styles.areas}>
				<div className={styles.title}>Выбор стекла</div>
				<ul className={styles.details}>
					{this.props.details.toArray().map(item => {
						let hasMaterial = this.props.orders.get(item.id) && this.props.orders.get(item.id).materialId;
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
									{this.getTitleMaterial(item)}
								</div>
								<div className={classnames(styles.controls)} onClick={e => e.stopPropagation()}>
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
										ref={'menuButton' + item.id}
										ButtonComponent='span'
										menu={
											<Dropdown>
												<div className={styles.dropdown}
													 onClick={() => this.refs['menuButton' + item.id]['close']()}>
													<div
														className={styles.item}
														onClick={() => this.editByIds([item.id])}>Редактировать
													</div>
													{hasMaterial &&
													<div
														className={styles.item}
														onClick={() => this.props.actions.app.removeOrders([item.id])}>
														Удалить заказ
													</div>
													}
													{hasMaterial &&
													<div
														className={styles.item}
														onClick={() => {
															this.applyMaterial(
																this.props.details
																	.filter(i => i.serviceIDs.indexOf(this.props.materials.get(this.props.orders.get(item.id).materialId).serviceId) >= 0)
																	.toArray()
																	.map(i => i.id),
																this.props.orders.get(item.id).materialId
															)
														}}>
														Приминить ко все стеклам
													</div>
													}
													{hasMaterial && this.props.details
														.toArray()
														.filter(i =>
														i.id !== item.id
														&& i.serviceIDs.indexOf(this.props.materials.get(this.props.orders.get(item.id).materialId).serviceId) >= 0)
														.map(i => (
															<div
																key={item.id + i.id}
																className={styles.item}
																onClick={() => this.applyMaterial([i.id], this.props.orders.get(item.id).materialId)}>
																Приминить на {i.caption}
															</div>))
													}
												</div>
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
				<div className={styles.footer}>
					<div
						className={styles.selectAll}
						onClick={(e) => this.toggleSelectedAll(!this.allDetailsSelected())}>
						<div
							className={classnames({
								[styles.checkbox]: true,
								[styles.checked]: this.allDetailsSelected()
							})}
						/>
						<span>Выбрать все</span>
					</div>
					<Button
						size="small"
						variant="flat"
						onClick={() => this.editSelectedDetails()}
						disabled={countSelected === 0}
						className={classnames({[styles.allEdit]: true, [styles.disabled]: countSelected === 0})}>
						Редактировать выбранные ({countSelected})
					</Button>
				</div>
			</div>
		)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Places);

