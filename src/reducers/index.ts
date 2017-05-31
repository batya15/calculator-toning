import {combineReducers, Reducer} from 'redux';


import {handleActions} from 'redux-actions';
const ADD_TODO = 'ADD_TODO';

const initialState = [{
	id: 0,
	text: 'Use Redux',
	completed: false
}];


let r =  handleActions<any, any>({

}, initialState);

export interface RootState {
	todos: any
}

export default combineReducers<RootState>({
	todos: r
});
