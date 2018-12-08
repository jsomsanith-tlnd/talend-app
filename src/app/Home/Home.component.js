import React from 'react';
import HeaderBar from '@talend/react-components/lib/HeaderBar';
import IconsProvider from '@talend/react-components/lib/IconsProvider';
import Layout from '@talend/react-components/lib/Layout';
import SidePanel from '@talend/react-components/lib/SidePanel';

const actions = [
	{
		label: 'Preparations',
		icon: 'talend-dataprep',
		onClick: () => console.log('Preparations clicked'),
	},
	{
		label: 'Datasets',
		icon: 'talend-folder',
		onClick: () => console.log('Datasets clicked'),
	},
	{
		label: 'Favorites',
		icon: 'talend-star',
		onClick: () => console.log('Favorites clicked'),
	},
];

export default function Home() {
	const sidePanel = <SidePanel actions={actions} onToggleDock={console.log} docked={false} />;

	return (
		<Layout
			header={<HeaderBar brand={{ label: 'Talend App Framework' }} />}
			mode="TwoColumns"
			one={sidePanel}
		>
			<IconsProvider />
			Coucou
		</Layout>
	);
}
