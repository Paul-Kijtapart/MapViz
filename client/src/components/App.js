import React from 'react';
import $ from 'jquery';

// Components
import MainMap from 'components/MainMap.js';
import InfoBox from 'components/InfoBox.js';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      zones: [],
      selectedZone: null
    };
  }

  onZoneSelected(id, type, coords) {
    this.setState({
      zones: this.state.zones,
      selectedZone: {id: id, type: type, coords: coords}
    });
  }

	render() {
		return (
			<div className="mapApp">
				<MainMap onZoneSelected={(id, type, coords) => {this.onZoneSelected(id, type, coords)}} />
        <InfoBox selectedZone={this.state.selectedZone} />
			</div>
		);
	}
};

export default App;