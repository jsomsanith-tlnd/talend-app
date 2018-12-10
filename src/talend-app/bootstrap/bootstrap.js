import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import thunk from 'redux-thunk';

import mergeModules from './modules';
import App from '../App';

function bootstrapRedux(options) {
	const { enhancers = [], initialState, middlewares = [], reducer = {} } = options.store;
	return createStore(
		combineReducers(reducer),
		initialState,
		compose(
			applyMiddleware(thunk, ...middlewares),
			...enhancers,
		),
	);
}

export default function bootstrap(configuration) {
	const options = mergeModules(configuration);
	const store = bootstrapRedux(options);
	render(
		<App store={store} loading={options.AppLoader} RootComponent={configuration.rootComponent} />,
		document.getElementById(options.appId),
	);
}
