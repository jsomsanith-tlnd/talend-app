import React, { Suspense } from 'react';
import AppLoader from '@talend/react-components/lib/AppLoader';
import IconsProvider from '@talend/react-components/lib/IconsProvider';

const LazyHome = React.lazy(() => import(/* webpackChunkName: "home" */ '../Home'));

function App() {
	return (
		<Suspense fallback={<AppLoader />}>
			<IconsProvider />
			<LazyHome />
		</Suspense>
	);
}

export default App;
