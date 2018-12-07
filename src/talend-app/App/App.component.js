import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

export default function App({ loading, store }) {
	return (
		<Provider store={store}>
			<Suspense fallback={loading}>Hello</Suspense>
		</Provider>
	);
}
App.propTypes = {
	loading: PropTypes.node,
	store: PropTypes.object,
};
