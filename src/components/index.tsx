import * as React from 'react';
import * as styles from './index.pcss';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Calculator from "./calculator/calculator";

injectTapEventPlugin();

interface IMainState {}
interface IMainProps {}

export class Main extends React.Component<IMainProps, IMainState> {
	render() {
		return (
			<MuiThemeProvider>
				<div className={styles.main}>
					<Calculator/>
				</div>
			</MuiThemeProvider>
		)
	}
}


export default Main;