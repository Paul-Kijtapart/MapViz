import React from 'react';
import $ from 'jquery';

// Components
import MainMap from 'components/MainMap.js';
import InfoBox from 'components/InfoBox.js';
import FieldSelection from 'components/FieldSelection.js';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      zones: [],
      selectedZone: null
    };
  }

  onZoneSelected(id, type, coords, building_type) {
    this.setState({
      zones: this.state.zones,
      selectedZone: {
        id: id,
        type: type,
        coords: coords
      }
    });
  }

  render() {
    return (
      <div className="mapApp">
        <div className='mapSelection'>
  				<MainMap 
            onZoneSelected={(id, type, coords) => {this.onZoneSelected(id, type, coords)}} 
            selectedZone={this.state.selectedZone}
          />
          <FieldSelection />
        </div>
        <div className="infoWrapper">
           <InfoBox selectedZone={this.state.selectedZone} />
           <div className="sentimentInfo">Sentiment Info</div>
        </div>
			</div>
    );
  }
};

export default App;