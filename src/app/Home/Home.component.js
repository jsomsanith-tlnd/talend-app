import React from 'react';
import HeaderBar from '@talend/react-components/lib/HeaderBar';
import IconsProvider from '@talend/react-components/lib/IconsProvider';
import Layout from '@talend/react-components/lib/Layout';
import HomeSidePanel from './HomeSidePanel.component';

export default function Home() {
	return (
		<Layout
			header={<HeaderBar brand={{ label: 'Talend App Framework' }} />}
			mode="TwoColumns"
			one={<HomeSidePanel />}
		>
			<IconsProvider />
			Coucou
		</Layout>
	);
}
