import * as React from 'react';
import * as styles from './orientation.pcss';
import * as mainStyles from '../../index.pcss'
import * as classnames from 'classnames';
import {componentWillAppendToBody} from "react-append-to-body";

interface IMainState {
	show: boolean
}
interface IMainProps {
}

export class Orientation extends React.Component<IMainProps, IMainState> {
	state = {
		show: false
	};
	private resize : ()=>void = null;
	constructor () {
		super();
		this.resize = () => {
			this.setState({
				show : (window.innerWidth < 440 && window.innerHeight > 440)
			})
		}
	}

	componentDidMount(){
		window.addEventListener('resize', this.resize)
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.resize)
	}
	render() {
		return (
			<div className={classnames({[mainStyles.main]: true, [styles.orientation] : true, [styles.show] : this.state.show})}>
				<i className={classnames(styles.icon, "material-icons")}>screen_rotation</i>
				<div className={styles.title}>Поверните ваше устройство</div>
				<div className={styles.info}>в горизонтальное положение для более комфортного просмотра сайта</div>
			</div>
		)
	}
}


export default componentWillAppendToBody(Orientation);