import * as React from 'react';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Admin from "./admin/index";
import * as styles from './index.pcss';
import 'muicss/dist/css/mui-noglobals.css';

injectTapEventPlugin();

const reqAdmin = /admin=admin/i;

interface IMainState {
}
interface IMainProps {
}
export class Main extends React.Component<IMainProps, IMainState> {
	render() {
		return (
			<MuiThemeProvider>
				<div className={styles.main}>
					{reqAdmin.test(location.search) ? <Admin/> : <div>Калькулятор</div> }
				</div>
			</MuiThemeProvider>
		)
	}
}


export default Main;