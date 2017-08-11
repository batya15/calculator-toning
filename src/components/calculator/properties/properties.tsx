import * as React from 'react';
import * as style from './properties.pcss';
import * as classnames from 'classnames';
import * as Button from 'muicss/lib/react/button';
import {connect} from 'react-redux';
import {RootState} from "reducers/index";
import {returntypeof} from "react-redux-typescript";
import {mapDispatchToProps} from "actions/index";
import {Api} from "api/index";
import {STEP} from "../../../reducers/step";

interface IState {
}

interface IProperties {
	readonly current: Api.IMaterial,
	readonly producer: Api.IMaterial[],
	readonly color: Api.IMaterial[],
	readonly opacity: Api.IMaterial[],
	readonly thickness: Api.IMaterial[],
}

const mapStateToProps = (rootState: RootState) => ({
	details: rootState.api.details,
	step: rootState.step,
	orders: rootState.orders,
	materials: rootState.api.materials,
	producers: rootState.api.producers,
	colors: rootState.api.colors,
	opacity: rootState.api.opacity,
	services: rootState.api.services,
	thickness: rootState.api.thickness,
});

const dispatchToProps = returntypeof(mapDispatchToProps);
const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & typeof dispatchToProps;

export class Properties extends React.Component<Props, IState> {

	private selectMaterial(m: Api.IMaterial) {
		this.props.actions.app.selectMaterial(m.id);
	}

	private getProperiesByCurrent(): IProperties {
		let firstEditableOrder = this.props.orders.filter(i => i.editable).first();
		let id = firstEditableOrder ? firstEditableOrder.editableServicesId : 1;

		let materialsByService = this.props.materials.filter(m => id === m.serviceId);

		let current = materialsByService.filter(i => i.id === firstEditableOrder.materialId).first();

		if (!current) {
			current = materialsByService.first();
			if (current) {
				setTimeout(() => this.selectMaterial(current), 0);
			}
		}

		return {
			current: current,
			producer: materialsByService.filter(material => current.colorId === material.colorId
				&& current.opacityId === material.opacityId
				&& current.thicknessId === material.thicknessId
			).toArray().sort((a, b) => {
				return this.props.producers.get(a.producerId).caption.length - this.props.producers.get(b.producerId).caption.length ||
					this.props.producers.get(a.producerId).caption
						.localeCompare(this.props.producers.get(b.producerId).caption);
			}),
			color: materialsByService.filter(material => current.colorId !== null
				&& current.producerId === material.producerId
				&& current.opacityId === material.opacityId
				&& current.thicknessId === material.thicknessId
			).toArray().sort((a, b) => {
				return this.props.colors.get(a.colorId).caption.length - this.props.colors.get(b.colorId).caption.length ||
					this.props.colors.get(a.colorId).caption.localeCompare(this.props.colors.get(b.colorId).caption);
			}),
			thickness: materialsByService.filter(material => current.thicknessId !== null
				&& current.producerId === material.producerId
				&& current.opacityId === material.opacityId
				&& current.colorId === material.colorId
			).toArray().sort((a, b) => {
				return this.props.thickness.get(a.thicknessId).caption.length - this.props.thickness.get(b.thicknessId).caption.length ||
					this.props.thickness.get(a.thicknessId).caption.localeCompare(this.props.thickness.get(b.thicknessId).caption);
			}),
			opacity: materialsByService.filter(material => current.opacityId !== null
				&& current.producerId === material.producerId
				&& current.thicknessId === material.thicknessId
				&& current.colorId === material.colorId
			).toArray().sort((a, b) => {
				return this.props.opacity.get(a.opacityId).caption.length - this.props.opacity.get(b.opacityId).caption.length ||
					this.props.opacity.get(a.opacityId).caption.localeCompare(this.props.opacity.get(b.opacityId).caption);
			}),
		};
	}

	shouldComponentUpdate(nextProps, nextState): boolean {
		return nextProps.step === STEP.PROPERTIES;
	}

	render() {
		let propertys = this.getProperiesByCurrent();

		let countGroup = (propertys.producer.length ? 1 : 0)
			+ (propertys.color.length ? 1 : 0)
			+ (propertys.opacity.length ? 1 : 0)
			+ (propertys.thickness.length ? 1 : 0 );

		return (
			<div className={style.property}>
				<div className={style.header}>
					<Button
						className={style.back}
						variant="flat"
						onClick={() => this.props.actions.app.toSelectServices()}
					>
						<i className="material-icons">arrow_back</i>
					</Button>
					<div className={style.title}>
						<div className={style.bold}>Подбор параметров</div>
						<div className={style.details}>
							{
								this.props.services.size &&
								this.props.services.get(this.props.orders.filter(item => item.editable).first().editableServicesId).caption
							}
							<span> : </span>
							{
								this.props.orders
									.toArray()
									.filter(item => item.editable)
									.map(item => this.props.details.get(item.detailId).caption)
									.join(' / ')
							}
						</div>
					</div>
				</div>
				{!!countGroup &&
				<div className={style.list}>
					{propertys.producer.length > 0 &&
					<div className={style.prop} style={{height: (100 / countGroup) + '%'}}>
						<div className={style.name}>Производитель:</div>
						<div className={style.options}>
							{propertys.producer.map(i => (
								<div
									className={style.select}
									onClick={() => this.selectMaterial(i)}
									key={i.producerId}>
									<div className={classnames({[style.radio] : true, [style.checked] : propertys.current.id === i.id})}/>
									{this.props.producers.get(i.producerId).caption}
									</div>
							))
							}
						</div>
					</div>
					}
					{propertys.color.length > 0 &&
					<div className={style.prop} style={{height: (100 / countGroup) + '%'}}>
						<div className={style.name}>Цвет:</div>
						<div className={style.options}>
							{propertys.color.map(i => (
								<div
									className={style.select}
									onClick={() => this.selectMaterial(i)}
									key={i.colorId}>
									<div className={classnames({[style.radio] : true, [style.checked] : propertys.current.id === i.id})}/>
									{this.props.colors.get(i.colorId).caption}
									</div>
							))
							}
						</div>
					</div>
					}
					{propertys.opacity.length > 0 &&
					<div className={style.prop} style={{height: (100 / countGroup) + '%'}}>
						<div className={style.name}>Светопропускаемость:</div>
						<div className={style.options}>
							{propertys.opacity.map(i => (
								<div
									className={style.select}
									onClick={() => this.selectMaterial(i)}
									key={i.opacityId}>
									<div className={classnames({[style.radio] : true, [style.checked] : propertys.current.id === i.id})}/>
									{this.props.opacity.get(i.opacityId).caption}
									</div>
							))
							}
						</div>
					</div>
					}
					{propertys.thickness.length > 0 &&
					<div className={style.prop} style={{height: (100 / countGroup) + '%'}}>
						<div className={style.name}>Толщина:</div>
						<div className={style.options}>
							{propertys.thickness.map(i => (
								<div
									className={style.select}
									onClick={() => this.selectMaterial(i)}
									key={i.thicknessId}>
									<div className={classnames({[style.radio] : true, [style.checked] : propertys.current.id === i.id})}/>
									{this.props.thickness.get(i.thicknessId).caption}
									</div>
							))
							}
						</div>
					</div>
					}

				</div>
				}
				{!countGroup &&
				<div className={style.error}>Для данного набора стекол нет подходящего материала</div>
				}
				<div className={style.footer}>
					<Button
						color="primary"
						variant="flat"
						disabled={!countGroup}
						onClick={() => this.props.actions.app.save(this.props.orders.filter(i => i.editable).first().materialId)}>
						Сохранить
					</Button>
				</div>


			</div>
		)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Properties);




