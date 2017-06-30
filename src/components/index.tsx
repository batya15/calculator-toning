import * as React from 'react';
import * as styles from './index.pcss';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import 'muicss/dist/css/mui-noglobals.css';
import Admin from "./admin/index";

injectTapEventPlugin();

interface IMainState {}
interface IMainProps {}
export class Main extends React.Component<IMainProps, IMainState> {
	render() {
		return (
			<MuiThemeProvider>
				{/*<div className={styles.main}>
					<Calculator/>
				</div>*/}
				<div className={styles.main}>
					<Admin/>
				</div>
			</MuiThemeProvider>
		)
	}
}


export default Main;