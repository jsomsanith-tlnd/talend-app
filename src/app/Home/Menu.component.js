/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SidePanel from '@talend/react-components/lib/SidePanel';

import HomeService from '../services/home';

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

function Menu(props) {
	return <SidePanel actions={actions} docked={props.docked} onToggleDock={props.onToggleDock} />;
}
Menu.propTypes = {
	docked: PropTypes.bool,
	onToggleDock: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
	return { docked: HomeService.selectors.getMenuDocked(state) };
}

const mapDispatchToProps = {
	onToggleDock: HomeService.actions.toggleMenu,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Menu);
