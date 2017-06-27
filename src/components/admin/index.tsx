import * as React from 'react';
import {connect} from "react-redux";
import {RootState} from "reducers/index";
import {returntypeof} from "react-redux-typescript";
import {mapDispatchToProps} from "actions/index";
import {Container, Appbar, Panel, Tabs, Tab, Button} from 'muicss/react';
import {Producers} from "./producers";

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
			this.props.actions.apiNeedColors(),
			this.props.actions.apiNeedDetails(),
			this.props.actions.apiNeedMaterials(),
			this.props.actions.apiNeedProducers(),
			this.props.actions.apiNeedOpacity(),
			this.props.actions.apiNeedThickness(),
			this.props.actions.apiNeedServices()
		]).then(() => this.setState({loaded: true}));
	}

	render() {
		if (this.state.loaded) {
			return (
				<div>
					<Panel>
						Json
					</Panel>
					<Tabs defaultSelectedIndex={0} justified={true}>
						<Tab value="Производители" label="Производители">
							<Producers actions={this.props.actions} materials={this.props.api.materials} producers={this.props.api.producers}/>
						</Tab>
						<Tab value="Толщина" label="Толщина">Толщина</Tab>
						<Tab value="Прозрачность" label="Прозрачность">Прозрачность</Tab>
						<Tab value="Цвета" label="Цвета">Цвета</Tab>
						<Tab value="Детали" label="Детали">Детали</Tab>
						<Tab value="Услуги" label="Услуги">Услуги</Tab>
						<Tab value="Материалы" label="Материалы">Материалы</Tab>
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