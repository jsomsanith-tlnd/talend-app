import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
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

class HomeSidePanel extends React.Component {
	constructor(props) {
		super(props);
		this.onToggleDock = bindActionCreators(HomeService.toggleSidePanel, props.dispatch);
	}

	render() {
		return (
			<SidePanel actions={actions} docked={this.props.docked} onToggleDock={this.onToggleDock} />
		);
	}
}
HomeSidePanel.propTypes = {
	docked: PropTypes.bool,
	dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
	return { docked: HomeService.getSidePanelDocked(state) };
}

export default connect(mapStateToProps)(HomeSidePanel);
