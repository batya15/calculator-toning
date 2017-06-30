import * as React from 'react';
import {connect} from "react-redux";
import {RootState} from "reducers/index";
import {returntypeof} from "react-redux-typescript";
import {mapDispatchToProps} from "actions/index";
import {Container, Appbar, Panel, Tabs, Tab, Button} from 'muicss/react';
import {Producers} from "./producers";
import {Thickness} from "./thickness";
import {Opacity} from "./opacity/index";
import {Colors} from "./colors/index";
import {Services} from "./services/index";
import {Details} from "./details/index";
import {Materials} from "./materials/index";

interface IState {
	loaded: boolean
}

const mapStateToProps = (rootState: RootState) => ({
	api: rootState.api
});

const dispatchToProps = returntypeof(mapDispatchToProps);
const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & typeof dispatchToProps;

export class Admin extends React.Component<Props, IState> {
	public state = {
		loaded: false
	};

	componentDidMount() {
		Promise.all([
			this.props.actions.api.apiNeedColors(),
			this.props.actions.api.apiNeedDetails(),
			this.props.actions.api.apiNeedMaterials(),
			this.props.actions.api.apiNeedProducers(),
			this.props.actions.api.apiNeedOpacity(),
			this.props.actions.api.apiNeedThickness(),
			this.props.actions.api.apiNeedServices()
		]).then(() => this.setState({loaded: true}));
	}

	render() {
		if (this.state.loaded) {
			return (
				<div>
					<Panel>
						<div style={{display: 'none'}}>
							{JSON.stringify({...this.props.api})}
						</div>
					</Panel>
					<Tabs defaultSelectedIndex={0} justified={true}>
						<Tab value="Производители" label="Производители">
							<Producers actions={this.props.actions.api} materials={this.props.api.materials} list={this.props.api.producers}/>
						</Tab>
						<Tab value="Толщина" label="Толщина">
							<Thickness actions={this.props.actions.api} materials={this.props.api.materials} list={this.props.api.thickness}/>
						</Tab>
						<Tab value="Прозрачность" label="Прозрачность">
							<Opacity actions={this.props.actions.api} materials={this.props.api.materials} list={this.props.api.opacity}/>
						</Tab>
						<Tab value="Цвета" label="Цвета">
							<Colors actions={this.props.actions.api} materials={this.props.api.materials} list={this.props.api.colors}/>
						</Tab>
						<Tab value="Детали" label="Детали">
							<Details
								actions={this.props.actions.api}
								list={this.props.api.details}
								services={this.props.api.services}
							/>
						</Tab>
						<Tab value="Услуги" label="Услуги">
							<Services
								actions={this.props.actions.api}
								details={this.props.api.details}
								materials={this.props.api.materials}
								list={this.props.api.services}
							/>
						</Tab>
						<Tab value="Материалы" label="Материалы">
							<Materials
								actions={this.props.actions.api}
								list={this.props.api.materials}
								services={this.props.api.services}
								colors={this.props.api.colors}
								opacity={this.props.api.opacity}
								details={this.props.api.details}
								thickness={this.props.api.thickness}
								producers={this.props.api.producers}
							/>
						</Tab>
					</Tabs>
				</div>
			);
		}
		return (
			<div>
				Загрузка...
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Admin);