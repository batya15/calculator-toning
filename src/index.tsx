import * as ReactDOM from 'react-dom';
import * as React from "react";
import { configureStore } from 'store';
import { Provider } from 'react-redux';
import Main from 'components/index';

const ROOT_ELEMENT = document.getElementById('calculator-toning');
const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<Main/>
	</Provider>,
	ROOT_ELEMENT
);
