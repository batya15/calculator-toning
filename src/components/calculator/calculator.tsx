import * as React from 'react';
import * as style from './calculator.pcss';
import * as classnames from 'classnames';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FlatButton from 'material-ui/FlatButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Paper from 'material-ui/Paper';
import deleteProperty = Reflect.deleteProperty;
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RootState} from "../../reducers/index";
import * as actions from "actions";
import {STEP} from "../../reducers/step";


export class Calculator extends React.Component<any, any> {
	constructor() {
		super();
		this.state = {
			cl: 'first',
			price: 0
		};
	}

	private priceClick(): void {
		this.setState({price: this.state.price != 8500 ? 8500 : 6300})

	}

	componentWillReceiveProps(nextProps) {
		switch (nextProps.step) {
			case STEP.SERVICES:
				this.setState({cl : 'second'});
				break;
			case  STEP.PROPERTIES:
				this.setState({cl : 'third'});
				break;
			default:
				this.setState({cl : this.props.step === STEP.PROPERTIES ? 'reset' : 'first'});
				break;
		}

		if (nextProps.step === STEP.PLACES ) {

		}
	}

	render() {
		let c = ["Заднее стекло", "Задние боковые", "Переднии боковые", "Лобовое стекло", "Полоска на лобовое"];
		let servs = ["Затемнение", "Атермальная", "Атермальная хамелион", "Съемная", "Цветная", "Зеркальная", "Бронирование", "Защита от сколов"];
		let row = [];
		let services = [];
		let property = [];

		for (let i = 0; i < c.length; i++) {
			row.push((
				<li key={i}>
					<div className={classnames(style.caption)}>
						<Checkbox label={c[i]}/>
					</div>
					<div className={classnames(style.label)}>
						Затемнение 80%/белый
					</div>
					<div className={classnames(style.edit)}>
						<FlatButton labelStyle={{textTransform: 'none'}} onClick={() => this.props.actions.editPlaces()}
									primary={true} label="Редактировать"/>
					</div>
					<div className={classnames(style.end)}>
						<IconMenu
							touchTapCloseDelay={1}
							iconButtonElement={<IconButton
								iconStyle={{
									width: 24,
									height: 24,
								}}
								style={{
									width: 36,
									height: 36,
									padding: 0,
								}}
							><MoreVertIcon /></IconButton>}
							anchorOrigin={{horizontal: 'left', vertical: 'top'}}
							targetOrigin={{horizontal: 'left', vertical: 'top'}}
						>
							<MenuItem primaryText="Редактировать" onTouchTap={() => this.props.actions.editPlaces()}/>
							<MenuItem primaryText="Удалить заказ"/>
							<MenuItem primaryText="Приминить ко все стеклам"/>
							<MenuItem primaryText="Приминить к лобовобу"/>
							<MenuItem primaryText="Приминить к боковым передним"/>
							<MenuItem primaryText="Приминитьь к задним боковым"/>
							<MenuItem primaryText="Приминить к полоске на лобовое"/>
						</IconMenu>
					</div>
					<div className={classnames(style.clr)}/>
				</li>
			))
		}
		for (let i = 0; i < servs.length; i++) {
			services.push((

				<RadioButton
					key={i}
					style={{width: '50%'}}
					className={classnames(style.srv)}
					value={"light" + i}
					label={servs[i] + " (?)"}
					onClick={() => this.props.actions.selectService()}
				/>

			))
		}

		if (Math.random() > 0) {
			property.push(
				<li key={1}>
					<div className={classnames(style.caption)}>
						Производитель
					</div>
					<RadioButtonGroup className={style.prop} name="shipSpeed" defaultSelected="suncontrol">
						<RadioButton
							style={{width: '50%'}}
							className={classnames(style.srv)}
							value="suncontrol"
							label="suncontrol"
							onClick={() => this.priceClick()}
						/>
						<RadioButton
							style={{width: '50%'}}
							className={classnames(style.srv)}
							value="2suncontrol"
							label="llumar"
							onClick={() => this.priceClick()}
						/>
					</RadioButtonGroup>
					<div className={style.clr}/>
				</li>
			)
			property.push(
				<li key={2}>
					<div className={classnames(style.caption)}>
						Цвет
					</div>
					<RadioButtonGroup className={style.prop} name="shipSpeed" defaultSelected="suncontrol">
						<RadioButton
							style={{width: '10%'}}
							className={classnames(style.srv)}
							value="suncontrol"
							iconStyle={{fill: '#f00'}}
							onClick={() => this.priceClick()}
						/>
						<RadioButton
							style={{width: '10%'}}
							className={classnames(style.srv)}
							value="2suncontrol"
							iconStyle={{fill: '#0f0'}}
							onClick={() => this.priceClick()}
						/>
						<RadioButton
							style={{width: '10%'}}
							className={classnames(style.srv)}
							value="3suncontrol"
							iconStyle={{fill: '#00f'}}
							onClick={() => this.priceClick()}
						/>
						<RadioButton
							style={{width: '10%'}}
							className={classnames(style.srv)}
							value="4suncontrol"
							iconStyle={{fill: '#ff0'}}
							onClick={() => this.priceClick()}
						/>
						<RadioButton
							style={{width: '10%'}}
							className={classnames(style.srv)}
							value="5suncontrol"
							iconStyle={{fill: '#0ff'}}
							onClick={() => this.priceClick()}
						/>
					</RadioButtonGroup>
					<div className={style.clr}/>
				</li>
			);
		} else {
			property.push(
				<li key={2}>
					<div className={classnames(style.caption)}>
						Свето пропускаемость
					</div>
					<RadioButtonGroup className={style.prop} name="shipSpeed" defaultSelected="suncontrol">
						<RadioButton
							style={{width: '8%'}}
							className={classnames(style.srv)}
							value="suncontrol"
							onClick={() => this.priceClick()}
							label="80%"
						/>
						<RadioButton
							style={{width: '8%'}}
							className={classnames(style.srv)}
							value="2suncontrol"
							onClick={() => this.priceClick()}
							label="60%"
						/>
						<RadioButton
							style={{width: '8%'}}
							className={classnames(style.srv)}
							value="3suncontrol"
							onClick={() => this.priceClick()}
							label="40%"
						/>
						<RadioButton
							style={{width: '8%'}}
							className={classnames(style.srv)}
							value="4suncontrol"
							onClick={() => this.priceClick()}
							label="20%"
						/>
					</RadioButtonGroup>
					<div className={style.clr}/>
				</li>
			);
			property.push(
				<li key={3}>
					<div className={classnames(style.caption)}>
						Толщина
					</div>
					<RadioButtonGroup className={style.prop} name="shipSpeed" defaultSelected="suncontrol">
						<RadioButton
							style={{width: '8%'}}
							className={classnames(style.srv)}
							value="suncontrol"
							onClick={() => this.priceClick()}
							label="200"
						/>
						<RadioButton
							style={{width: '8%'}}
							className={classnames(style.srv)}
							value="2suncontrol"
							onClick={() => this.priceClick()}
							label="300"
						/>
						<RadioButton
							style={{width: '8%'}}
							className={classnames(style.srv)}
							value="3suncontrol"
							onClick={() => this.priceClick()}
							label="400"
						/>
						<RadioButton
							style={{width: '8%'}}
							className={classnames(style.srv)}
							value="4suncontrol"
							onClick={() => this.priceClick()}
							label="800"
						/>
					</RadioButtonGroup>
					<div className={style.clr}/>
				</li>
			)
		}
		return (
			<div className={classnames(style.header)}>
				<Paper zDepth={1} rounded={false} className={classnames(style.left)}>
					<div className={classnames(style.scroll, style[this.state.cl])}>
						<div
							className={classnames(style.step, style.areas)}
						>
							<b>Выбор стекла{this.props.step}</b>
							<ul>
								{row}
							</ul>
							<div>
										<span className={classnames(style.caption)}>
											<Checkbox label="Выбрать все"/>
										</span>
								<span className={classnames(style.allEdit)}>
											<FlatButton labelStyle={{textTransform: 'none'}}
														onClick={() => this.props.actions.editPlaces()} primary={true}
														label="Редактировать выбранные (2)"/>
										</span>
							</div>
						</div>
						<div
							className={classnames(style.step, style.services)}
						>
							<div className={classnames(style.title)}>
								<FlatButton
									label="Назад"
									primary={true}
									onClick={() => this.props.actions.editPlaces()}
								/>
								<span><b>Выбор типа тонирования</b></span>
								<div className={style.ar}>Заднее/лобовое/передние боковые</div>
							</div>
							<RadioButtonGroup className={style.container} name="shipSpeed"
											  defaultSelected="light1">
								{services}
							</RadioButtonGroup>

						</div>
						<div
							className={classnames(style.step, style.property)}

						>
							<div className={classnames(style.title)}>
								<FlatButton
									label="Назад"
									primary={true}
									onClick={() => this.props.actions.editPlaces()}
								/>
								<span><b>Подбор параметров</b></span>
								<div className={style.ar}>Атермальная - Заднее/лобовое/передние боковые</div>
							</div>
							<ul>
								{property}
							</ul>


							<FlatButton
								label="Сохранить"
								style={{float: 'right'}}
								onClick={() => this.props.actions.save()}
								primary={true}
							/>
						</div>
					</div>
				</Paper>
				<Paper zDepth={1} rounded={false} className={classnames(style.right)}>
					<h1>{this.state.price}р.</h1>
					<div className={style.footer}>
						<RaisedButton label="Оформить заказ"
									  onTouchTap={() => alert("Модалочка будет, введите свое имя и телефон")}
									  primary={true} style={style}/>
						<div className={style.c}>
							Цены являються приближенными и т.д. и бла бла бла
						</div>
					</div>
				</Paper>
				<div className={classnames(style.clr)}/>
			</div>
		)
	}
}

export default connect(
	(state: RootState) => {
		return {
			step: state.step
		};
	},
	(dispatch) => {
		return {
			actions: bindActionCreators(actions as any, dispatch)
		};
	}
)(Calculator);

