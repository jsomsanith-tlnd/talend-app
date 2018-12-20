import React from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import EntitiesService from '../../talend-app-entities';

class DatasetsList extends React.Component {
	componentDidMount() {
		this.props.fetchDataset('datasets', '/datasets.json');
	}

	render() {
		const { isFetching, data, error } = this.props.datasets;
		return (
			<div>
				<h1 key="heading" className="sr-only">
					Datasets list
				</h1>
				{isFetching && <div key="fetching">Fetching</div>}
				{error && <div key="error">Error: {error.message}</div>}
				{data && (
					<div key="data">
						<pre>{JSON.stringify(data, null, 2)}</pre>
					</div>
				)}
			</div>
		);
	}
}
DatasetsList.propTypes = {
	datasets: PropType.shape({
		isFetching: PropType.bool,
		data: PropType.array,
		error: PropType.object,
	}),
	fetchDataset: PropType.func,
};
DatasetsList.defaultProps = {
	datasets: {},
};

function mapStateToProps(state) {
	return { datasets: EntitiesService.selectors.getEntity(state, 'datasets') };
}

const mapDispatchToProps = {
	fetchDataset: EntitiesService.actions.fetchEntity,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(DatasetsList);
