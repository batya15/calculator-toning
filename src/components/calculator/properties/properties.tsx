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


interface IState {
	currentMaterialId: number
}

interface IProperties {
	readonly producer: Api.IMaterial[],
	readonly color: Api.IMaterial[],
	readonly opacity: Api.IMaterial[],
	readonly thickness: Api.IMaterial[],
}

const mapStateToProps = (rootState: RootState) => ({
	details: rootState.api.details,
	orders: rootState.orders,
	materials: rootState.api.materials,
	producers: rootState.api.producers,
	colors: rootState.api.colors,
	opacity: rootState.api.opacity,
	thickness: rootState.api.thickness,
});

const dispatchToProps = returntypeof(mapDispatchToProps);
const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & typeof dispatchToProps;

export class Properties extends React.Component<Props, IState> {
	constructor(props) {
		super(props);
		let t = this.props.orders.filter(i => i.editable)[0];
		this.state = {
			currentMaterialId: t ? t.materialId : null
		};
	}

	getProperiesByCurrent(): IProperties {
		let t = this.props.orders.filter(i => i.editable)[0];
		let id = t ? t.editableServicesId : 1;

		let r = this.props.materials.filter(m => {
			return id === m.serviceId;
		});

		let m = r.filter(i => i.id === this.state.currentMaterialId)[0];
		let current = m ? m : r[0];

		let prop: IProperties = {
			producer: r.filter(material => current.colorId === material.colorId
				&& current.opacityId === material.opacityId
				&& current.thicknessId === material.thicknessId
			),
			color: r.filter(material => current.colorId !== null
				&& current.producerId === material.producerId
				&& current.opacityId === material.opacityId
				&& current.thicknessId === material.thicknessId
			),
			thickness: r.filter(material => current.thicknessId !== null
				&& current.producerId === material.producerId
				&& current.opacityId === material.opacityId
				&& current.colorId === material.colorId
			),
			opacity: r.filter(material => current.opacityId !== null
				&& current.producerId === material.producerId
				&& current.thicknessId === material.thicknessId
				&& current.colorId === material.colorId
			)
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
					<div className={style.ar}>Атермальная - Заднее/лобовое/передние боковые</div>
				</div>
				<ul>
					<div>
						{propertys.producer.length > 0 &&
						propertys.producer.map(i => (
							<div onClick={() => this.setState({currentMaterialId: i.id})}
								 key={i.producerId}>{this.props.producers.filter(p => p.id === i.producerId)[0].caption}</div>
						))
						}
					</div>
					<div>
						{propertys.color.length > 0 &&
						propertys.color.map(i => (
							<div onClick={() => this.setState({currentMaterialId: i.id})}
								 key={i.colorId}>{this.props.colors.filter(p => p.id === i.colorId)[0].caption}</div>
						))
						}
					</div>
					<div>
						{propertys.opacity.length > 0 &&
						propertys.opacity.map(i => (
							<div onClick={() => this.setState({currentMaterialId: i.id})}
								 key={i.opacityId}>{this.props.opacity.filter(p => p.id === i.opacityId)[0].caption}</div>
						))
						}
					</div>
					<div>
						{propertys.thickness.length > 0 &&
						propertys.thickness.map(i => (
							<div onClick={() => this.setState({currentMaterialId: i.id})}
								 key={i.thicknessId}>{this.props.thickness.filter(p => p.id === i.thicknessId)[0].caption}</div>
						))
						}
					</div>
				</ul>


				<Button
					label="Сохранить"
					style={{float: 'right'}}
					onClick={() => this.props.actions.app.save(this.state.currentMaterialId)}/>
			</div>
		)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Properties);




