import * as React from 'react';
import * as styles from './places.pcss';
import * as classnames from 'classnames';
import {RootState} from "reducers/index";
import {returntypeof} from 'react-redux-typescript';
import {mapDispatchToProps} from "actions";
import {connect} from 'react-redux';
import * as Button from 'muicss/lib/react/button';
import * as Checkbox from 'muicss/lib/react/checkbox';
import {MenuList, MenuItem, MenuButton, Dropdown, SubMenuItem} from 'react-menu-list';

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
		this.props.actions.app.editPlaces();
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
		return Object.values(this.state.selectedIds).filter(i => i).length === this.props.details.length;
	}

	render() {
		let countSelected = Object.values(this.state.selectedIds).filter(i => i).length;
		console.log(countSelected);
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
											checked={!!this.state.selectedIds[item.id]}
											onChange={(e) => this.toggleDetails(item.id, e.target.checked)}/>
									</div>
									<div className={classnames(styles.label)}>
										Затемнение 80%/белый
									</div>
									<div className={classnames(styles.edit)}>
										<Button
											color="primary"
											onClick={() => this.editByPlaces([item])}
											label="edit"/>
									</div>
									<div className={classnames(styles.end)}>
										<MenuButton
											menu={
												<Dropdown>
													<MenuList>
														<li>Mercury</li>
														<div style={{
															height: '50px', overflowY: 'scroll', border: '1px solid gray'
														}}>
															<li>Venus</li>
															<li>Earth</li>
															<li>Mars</li>
															<li>Jupiter</li>
															<li>Saturn</li>
															<li>Uranus</li>
														</div>
														<li>Neptune</li>
														<hr style={{margin: '1px 0'}} />
														<SubMenuItem
															style={{cursor: 'pointer', userSelect: 'none'}}
															highlightedStyle={{background: 'gray'}}
															menu={
																<Dropdown>
																	<MenuList>
																		<li>Ceres</li>
																		<li>Pluto</li>
																		<li>Eris</li>
																		<hr style={{margin: '1px 0'}} />
																		<div>
																			Test textbox:{' '}
																			<input type="text" />
																		</div>
																	</MenuList>
																</Dropdown>
															}>
															Dwarf Planets ►
														</SubMenuItem>
													</MenuList>
												</Dropdown>
											}
										>
											Menu Button
										</MenuButton>
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
							checked={this.allDetailsSelected()}
							onChange={(e) => this.toggleSelectedAll(e.target.checked)}
						/>
					</span>
					<span className={classnames(styles.allEdit)}>
						<button
							onClick={() => this.editByIds([])}
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

