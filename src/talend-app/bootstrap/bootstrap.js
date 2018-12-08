import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, combineReducers, createStore, compose } from 'redux';

import mergeModules from './modules';
import App from '../App';

function bootstrapRedux(options) {
	return createStore(
		combineReducers(options.reducers || {}),
		options.initialState,
		compose(
			applyMiddleware(...(options.middlewares || [])),
			...(options.enhancers || []),
		),
	);
}

export default function bootstrap(configuration) {
	const options = mergeModules(configuration);
	console.log(options);
	const store = bootstrapRedux(options);
	render(
		<App store={store} loading={options.AppLoader} RootComponent={configuration.rootComponent} />,
		document.getElementById(options.appId),
	);
}
