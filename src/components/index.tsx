import * as React from 'react';
import * as style from './index.pcss';
import * as classnames from 'classnames';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Paper from 'material-ui/Paper';
import deleteProperty = Reflect.deleteProperty;
import Calculator from "./calculator/calculator";

injectTapEventPlugin();

export class Main extends React.Component<any, any> {
	render() {
		return (
			<MuiThemeProvider>
				<div className={classnames(style.main)}>
					<Calculator/>
					<Paper zDepth={1} rounded={false} className={classnames(style.car)}>
						<div className={classnames(style.select)}>
							<div>Выбор машины</div>
							<div>Выбор цвета</div>
						</div>
					</Paper>
				</div>
			</MuiThemeProvider>
		)
	}
}


export default Main;