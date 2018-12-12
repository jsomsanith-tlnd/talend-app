import React from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import { fetchCollection, getCollection } from '../../talend-app-collections';

class DatasetsList extends React.Component {
	// TODO in a saga
	componentDidMount() {
		fetchCollection(
			'datasets',
			fetch('/datasets.json').then(resp => {
				if (resp.ok) {
					return resp.json();
				}
				throw new Error(`${resp.status} - ${resp.statusText}`);
			}),
		)(this.props.dispatch);
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
};
DatasetsList.defaultProps = {
	datasets: {},
};

function mapStateToProps(state) {
	return { datasets: getCollection(state, 'datasets') };
}

export default connect(mapStateToProps)(DatasetsList);
