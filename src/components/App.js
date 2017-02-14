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

  onZoneSelected(type, coords) {
    this.setState({
      zones: this.state.zones,
      selectedZone: {type: type, coords: coords}
    });
  }

	render() {
		return (
			<div className="mapApp">
				<MainMap onZoneSelected={this.onZoneSelected.bind(this)} />
        <InfoBox selectedZone={this.state.selectedZone} />
			</div>
		);
	}
};

export default App;