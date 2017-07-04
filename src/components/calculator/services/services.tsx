import * as React from 'react';
import * as styles from './services.pcss';
import * as classnames from 'classnames';
import * as Button from 'muicss/lib/react/button';
import * as Radio from 'muicss/lib/react/radio';
import {connect} from "react-redux";
import {RootState} from "reducers/index";
import {returntypeof} from "react-redux-typescript";
import {mapDispatchToProps} from "actions/index";
import {Api} from "api/index";

interface IState {
}

const mapStateToProps = (rootState: RootState) => ({
	details: rootState.api.details,
	orders: rootState.orders,
	services: rootState.api.services,
	materials: rootState.api.materials
});

const dispatchToProps = returntypeof(mapDispatchToProps);
const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & typeof dispatchToProps;

export class Services extends React.Component<Props, IState> {

	private getAvailableServiceIds(): Set<number> {
		let result: Set<number> = new Set;

		let itemsFilter = this.props.orders.filter(o => o.editable);

		let idsCount = itemsFilter
			.reduce((init, order) => {
				let details = this.props.details.filter(i => i.id === order.detailId);
				if (details.length > 0) {
					return init.concat(details[0].serviceIDs);
				}
				return init;
			}, [])
			.reduce((result, id) => {
				if (result[id]) {
					result[id] += 1;
				} else {
					result[id] = 1;
				}
				return result;
			}, {});

		for (let key in idsCount) {
			if (idsCount.hasOwnProperty(key) && idsCount[key] >= itemsFilter.length) {
				result.add(parseInt(key))
			}
		}
		return result;
	}

	private selectedService(id: number) {
		setTimeout(() => {
			this.props.actions.app.selectService(id);

			let r = this.props.materials.filter(m => {
				return id === m.serviceId;
			});

			let prop = {
				color: [],
				prod: [],
				t: [],
				opacity: []
			};

			let current = this.props.materials[0];

			prop.prod = r.filter(material => {
				return current.colorId === material.colorId
					&& current.opacityId === material.opacityId
					&& current.thicknessId === material.thicknessId
			});

			prop.color = r.filter(material => {
				return current.producerId === material.producerId
					&& current.opacityId === material.opacityId
					&& current.thicknessId === material.thicknessId
			});

			prop.t = r.filter(material => {
				return current.producerId === material.producerId
					&& current.opacityId === material.opacityId
					&& current.colorId === material.colorId
			});

			prop.opacity = r.filter(material => {
				return current.producerId === material.producerId
					&& current.thicknessId === material.thicknessId
					&& current.colorId === material.colorId
			});
			/*
			r.forEach(m => {
				if (m.serviceId === id) {
					return false;
				}


				if (m.colorId !== null) {
					if (prop.color.indexOf(m.colorId) < 0) {
						prop.color.push(m.colorId);
					}
				}
				if (m.producerId !== null) {
					if (prop.prod.indexOf(m.producerId) < 0) {
						prop.prod.push(m.producerId);
					}
				}

				if (m.thicknessId !== null) {
					if (prop.t.indexOf(m.thicknessId) < 0) {
						prop.t.push(m.thicknessId);
					}
				}

				if (m.opacityId !== null) {
					if (prop.opacity.indexOf(m.opacityId) < 0) {
						prop.opacity.push(m.opacityId);
					}
				}
			});
*/
			console.log(prop);

			console.log(r);
		}, 400);
	}

	render() {
		let availableServiceIds: Set<number> = this.getAvailableServiceIds();
		return (
			<div className={styles.services}>
				<div className={classnames(styles.title)}>
					<Button
						label="Назад"
						onClick={() => this.props.actions.app.toSelectDetails()}
					/>
					<span><b>Выбор типа тонирования</b></span>
					{/*<div className={styles.ar}>
					 {this.props.places.list
					 .filter(item => item.editable)
					 .map(item => (<span key={item.place.id}>{item.place.caption}/</span>))
					 }
					 </div>*/}
				</div>
				{this.props.services
					.filter(item => availableServiceIds.has(item.id))
					.map(item => (
						<Radio
							name="inputB"
							label={item.caption + " (?)"}
							key={item.id}
							onClick={() => this.selectedService(item.id)}
						/>)
					)}

			</div>
		)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Services);