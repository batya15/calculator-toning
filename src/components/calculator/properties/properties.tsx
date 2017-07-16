import * as React from 'react';
import * as style from './properties.pcss';
import * as classnames from 'classnames';
import * as Button from 'muicss/lib/react/button';
import {connect} from 'react-redux';
import * as Radio from 'muicss/lib/react/radio';
import {RootState} from "reducers/index";
import {returntypeof} from "react-redux-typescript";
import {mapDispatchToProps} from "actions/index";
import {Api} from "api/index";
import {MapColor, MapOpacity, MapProducer, MapThickness} from "../../../reducers/api/index";
import {STEP} from "../../../reducers/step";


interface IState {

}

interface IProperties {
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
		let t = this.props.orders.filter(i => i.editable).first();
		let id = t ? t.editableServicesId : 1;

		let r = this.props.materials.filter(m => {
			return id === m.serviceId;
		});

		let m = r.filter(i => i.id === t.materialId).first();
		let current = m ? m : r.first();

		let prop: IProperties = {
			producer: r.filter(material => current.colorId === material.colorId
				&& current.opacityId === material.opacityId
				&& current.thicknessId === material.thicknessId
			).toArray(),
			color: r.filter(material => current.colorId !== null
				&& current.producerId === material.producerId
				&& current.opacityId === material.opacityId
				&& current.thicknessId === material.thicknessId
			).toArray(),
			thickness: r.filter(material => current.thicknessId !== null
				&& current.producerId === material.producerId
				&& current.opacityId === material.opacityId
				&& current.colorId === material.colorId
			).toArray(),
			opacity: r.filter(material => current.opacityId !== null
				&& current.producerId === material.producerId
				&& current.thicknessId === material.thicknessId
				&& current.colorId === material.colorId
			).toArray()
		};

		console.log(prop);

		return prop;
	}

	render() {
		let propertys = this.getProperiesByCurrent();

		return (
			<div className={style.property}>
				<div className={classnames(style.title)}>
					<Button
						label="Назад"
						onClick={() => this.props.actions.app.toSelectServices()}
					/>
					<span><b>Подбор параметров</b></span>
					<div className={style.ar}>
						{<span>{this.props.services.size
						&& this.props.step === STEP.PROPERTIES
						&& this.props.services.get(this.props.orders.filter(item => item.editable).first().editableServicesId).caption}/</span>}
						{
							this.props.orders
								.toArray()
								.filter(item => item.editable)
								.map(item => (
									<span key={item.detailId}>{this.props.details.get(item.detailId).caption}/</span>)
								)
						}
					</div>
				</div>
				<ul>
					<div>
						{propertys.producer.length > 0 &&
						propertys.producer.map(i => (
							<div onClick={() => this.selectMaterial(i)}
								 key={i.producerId}>{this.props.producers.get(i.producerId).caption}</div>
						))
						}
					</div>
					<div>
						{propertys.color.length > 0 &&
						propertys.color.map(i => (
							<div onClick={() => this.selectMaterial(i)}
								 key={i.colorId}>{this.props.colors.get(i.colorId).caption}</div>
						))
						}
					</div>
					<div>
						{propertys.opacity.length > 0 &&
						propertys.opacity.map(i => (
							<div onClick={() => this.selectMaterial(i)}
								 key={i.opacityId}>{this.props.opacity.get(i.opacityId).caption}</div>
						))
						}
					</div>
					<div>
						{propertys.thickness.length > 0 &&
						propertys.thickness.map(i => (
							<div onClick={() => this.selectMaterial(i)}
								 key={i.thicknessId}>{this.props.thickness.get(i.thicknessId).caption}</div>
						))
						}
					</div>
				</ul>


				<Button
					label="Сохранить"
					style={{float: 'right'}}
					onClick={() => this.props.actions.app.save(this.props.orders.filter(i => i.editable).first().materialId)}/>
			</div>
		)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Properties);




