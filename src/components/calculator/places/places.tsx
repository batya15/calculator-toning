import * as React from 'react';
import * as style from './places.pcss';
import * as classnames from 'classnames';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FlatButton from 'material-ui/FlatButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import deleteProperty = Reflect.deleteProperty;


export default class Places extends React.Component<any, any> {
	render() {
		let c = ["Заднее стекло", "Задние боковые", "Переднии боковые", "Лобовое стекло", "Полоска на лобовое"];
		let row = [];

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

		return (
			<div className={style.areas}>
				<b>Выбор стекла</b>
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
		)
	}
}


