import * as React from 'react';
import * as style from './properties.pcss';
import * as classnames from 'classnames';
import FlatButton from 'material-ui/FlatButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import deleteProperty = Reflect.deleteProperty;

export default class Properties extends React.Component<any, any> {


	render() {
		let property = [];
		
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
							onClick={() => console.log('asd')}
						/>
						<RadioButton
							style={{width: '50%'}}
							className={classnames(style.srv)}
							value="2suncontrol"
							label="llumar"
							onClick={() => console.log('asd')}
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
							onClick={() => console.log('asd')}
						/>
						<RadioButton
							style={{width: '10%'}}
							className={classnames(style.srv)}
							value="2suncontrol"
							iconStyle={{fill: '#0f0'}}
							onClick={() => console.log('asd')}
						/>
						<RadioButton
							style={{width: '10%'}}
							className={classnames(style.srv)}
							value="3suncontrol"
							iconStyle={{fill: '#00f'}}
							onClick={() => console.log('asd')}
						/>
						<RadioButton
							style={{width: '10%'}}
							className={classnames(style.srv)}
							value="4suncontrol"
							iconStyle={{fill: '#ff0'}}
							onClick={() => console.log('asd')}
						/>
						<RadioButton
							style={{width: '10%'}}
							className={classnames(style.srv)}
							value="5suncontrol"
							iconStyle={{fill: '#0ff'}}
							onClick={() => console.log('asd')}
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
							onClick={() => console.log('asd')}
							label="80%"
						/>
						<RadioButton
							style={{width: '8%'}}
							className={classnames(style.srv)}
							value="2suncontrol"
							onClick={() => console.log('asd')}
							label="60%"
						/>
						<RadioButton
							style={{width: '8%'}}
							className={classnames(style.srv)}
							value="3suncontrol"
							onClick={() => console.log('asd')}
							label="40%"
						/>
						<RadioButton
							style={{width: '8%'}}
							className={classnames(style.srv)}
							value="4suncontrol"
							onClick={() => console.log('asd')}
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
							onClick={() => console.log('asd')}
							label="200"
						/>
						<RadioButton
							style={{width: '8%'}}
							className={classnames(style.srv)}
							value="2suncontrol"
							onClick={() => console.log('asd')}
							label="300"
						/>
						<RadioButton
							style={{width: '8%'}}
							className={classnames(style.srv)}
							value="3suncontrol"
							onClick={() => console.log('asd')}
							label="400"
						/>
						<RadioButton
							style={{width: '8%'}}
							className={classnames(style.srv)}
							value="4suncontrol"
							onClick={() => console.log('asd')}
							label="800"
						/>
					</RadioButtonGroup>
					<div className={style.clr}/>
				</li>
			)
		}
		return (
			<div className={style.property}>
				<div className={classnames(style.title)}>
					<FlatButton
						label="Назад"
						primary={true}
						onClick={() => this.props.actions.editOrders()}
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
		)
	}
}



