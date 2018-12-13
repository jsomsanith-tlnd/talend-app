import React from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import CollectionsService from '../../talend-app-collections';

class DatasetsList extends React.Component {
	componentDidMount() {
		this.props.dispatch(CollectionsService.actions.fetchCollection('datasets', '/datasets.json'));
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
	dispatch: PropType.func.isRequired,
};
DatasetsList.defaultProps = {
	datasets: {},
};

function mapStateToProps(state) {
	return { datasets: CollectionsService.selectors.getCollection(state, 'datasets') };
}

export default connect(mapStateToProps)(DatasetsList);
