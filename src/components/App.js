import React from 'react';
import $ from 'jquery';

// Components
import MainMap from 'components/MainMap.js';

class App extends React.Component {

	render() {
		return (
			<div className="mapApp">
				<MainMap />
			</div>
		);
	}
};

export default App;