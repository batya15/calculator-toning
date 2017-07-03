import * as React from 'react';
import Admin from "./admin/index";
import * as styles from './index.pcss';
import 'muicss/dist/css/mui-noglobals.css';
import Calculator from "./calculator/calculator";

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