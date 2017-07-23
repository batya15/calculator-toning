import * as React from 'react';
import * as styles from './index.pcss';
import 'muicss/dist/css/mui-noglobals.css';
import Calculator from "./calculator/calculator";
import Admin from "./admin/index";

const REGEXP_ADMIN = /admin=admin/i;

interface IMainState {
}
interface IMainProps {
}

export class Main extends React.Component<IMainProps, IMainState> {
	render() {
		return (
			<div className={styles.main}>
				{REGEXP_ADMIN.test(location.search) ? <Admin/> : <Calculator/>}
			</div>
		)
	}
}


export default Main;