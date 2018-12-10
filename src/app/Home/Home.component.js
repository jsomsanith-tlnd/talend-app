import React, { Suspense } from 'react';
import HeaderBar from '@talend/react-components/lib/HeaderBar';
import Layout from '@talend/react-components/lib/Layout';
import Loader from '@talend/react-components/lib/Loader';
import Menu from './Menu.component';

const LazyDatasetsList = React.lazy(() =>
	import(/* webpackChunkName: "datasets-list" */ '../DatasetsList'),
);
const LazyPreparationsList = React.lazy(() =>
	import(/* webpackChunkName: "preparations-list" */ '../PreparationsList'),
);

export default function Home() {
	return (
		<Layout
			header={<HeaderBar brand={{ label: 'Talend App Framework' }} />}
			mode="TwoColumns"
			one={<Menu />}
		>
			<Suspense fallback={<Loader />}>
				<LazyDatasetsList />
			</Suspense>
		</Layout>
	);
}
