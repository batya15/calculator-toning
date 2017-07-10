import * as React from 'react';
import {connect} from "react-redux";
import {RootState} from "reducers/index";
import {returntypeof} from "react-redux-typescript";
import {mapDispatchToProps} from "actions/index";
import * as Button from 'muicss/lib/react/button';
import * as Panel from 'muicss/lib/react/panel';
import * as Tabs from 'muicss/lib/react/tabs';
import * as Tab from 'muicss/lib/react/tab';
import {Producers} from "./producers";
import {Thickness} from "./thickness";
import {Opacity} from "./opacity/index";
import {Colors} from "./colors/index";
import {Services} from "./services/index";
import {Details} from "./details/index";
import {Materials} from "./materials/index";
import * as styles from "./admin.pcss"

interface IState {
	loaded: boolean,
	fileName: string;
}

const mapStateToProps = (rootState: RootState) => ({
	api: rootState.api
});

const dispatchToProps = returntypeof(mapDispatchToProps);
const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & typeof dispatchToProps;

export class Admin extends React.Component<Props, IState> {
	public state = {
		loaded: true,
		fileName: ''
	};

	private imitateClickFromInputFile(): void {
		this.refs.fileInput['click']();
	}

	private loadFromFile(evn): void {
		if (evn.target.files.length === 0) {
			this.setState({fileName: ''});
			return;
		}
		let file = evn.target.files[0];
		let reader = new FileReader();
		this.setState({fileName: evn.target.value});
		reader.onload = () => {
			try {
				let json = JSON.parse(reader.result);
				this.props.actions.api.apiLoadFromFile(json);
			} catch (e) {
				console.error(e);
				alert("Ошибка! Невозможно прочитать файл.");
			}
			reader.onload = null;
		};
		reader.readAsText(file);
	}

	private saveToFile(): void {
		let a = document.createElement("a");
		let result = {
			details: this.props.api.details.toArray(),
			services: this.props.api.services.toArray(),
			materials: this.props.api.materials.toArray(),
			producers: this.props.api.producers.toArray(),
			colors: this.props.api.colors.toArray(),
			opacity: this.props.api.opacity.toArray(),
			thickness: this.props.api.thickness.toArray()
		};


		let file = new Blob([JSON.stringify(result)], {type: 'text/plain'});
		a.href = URL.createObjectURL(file);
		a.download = 'api.json';
		a.click();
	}

	private loadFromServer(): void {
		this.setState({loaded: false, fileName: 'Загрузка с сервера...'});
		Promise.all([
			this.props.actions.api.apiNeedColors(),
			this.props.actions.api.apiNeedProducers(),
			this.props.actions.api.apiNeedOpacity(),
			this.props.actions.api.apiNeedThickness(),
			this.props.actions.api.apiNeedServices(),
			this.props.actions.api.apiNeedDetails(),
			this.props.actions.api.apiNeedMaterials()
		]).then(() => this.setState({loaded: true, fileName: 'Загружено с сервера'}));
	}

	render() {
		return (
			<div>
				<Panel className={styles.header}>
					<Button
						size="small"
						color="primary"
						onClick={() => this.loadFromServer()}
						disabled={!this.state.loaded}>Загрузить с сервера
					</Button>
					<Button
						size="small"
						color="primary"
						className={styles.save}
						onClick={() => this.saveToFile()}>Сохранить в файл</Button>
					<Button
						size="small"
						color="primary"
						onClick={() => this.imitateClickFromInputFile()}>Загрузить из файла</Button>
					<input
						ref="fileInput"
						style={{display: 'none'}}
						onChange={(e) => this.loadFromFile(e)}
						type="file"/>
					<span className={styles.fileName}>{this.state.fileName}</span>
				</Panel>
				<Tabs defaultSelectedIndex={0} justified={true}>
					<Tab value="Производители" label="Производители">
						<Producers
							actions={this.props.actions.api}
							materials={this.props.api.materials}
							list={this.props.api.producers}/>
					</Tab>
					<Tab value="Толщина" label="Толщина">
						<Thickness
							actions={this.props.actions.api}
							materials={this.props.api.materials}
							list={this.props.api.thickness}/>
					</Tab>
					<Tab value="Прозрачность" label="Прозрачность">
						<Opacity
							actions={this.props.actions.api}
							materials={this.props.api.materials}
							list={this.props.api.opacity}/>
					</Tab>
					<Tab value="Цвета" label="Цвета">
						<Colors
							actions={this.props.actions.api}
							materials={this.props.api.materials}
							list={this.props.api.colors}/>
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
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Admin);