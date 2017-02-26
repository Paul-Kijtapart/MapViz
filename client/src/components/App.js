import React from 'react';
import $ from 'jquery';

// Components
import MainMap from 'components/MainMap.js';
import InfoBox from 'components/InfoBox.js';
import FieldSelection from 'components/FieldSelection.js';
import TweetBox from 'components/TweetBox.js';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      year: 2013,
      zones: [],
      selectedZone: null
    };
  }

  onZoneSelected(id, type, coords) {
    this.setState({
      zones: this.state.zones,
      selectedZone: {
        id: id,
        type: type,
        coords: coords
      }
    });
  }

  onYearChange(year) {
    this.setState({year: year});
  }

  render() {
    return (
      <div className="mapApp">
        <div className='mapSelection'>
  				<MainMap year={this.state.year} onZoneSelected={(id, type, coords) => {this.onZoneSelected(id, type, coords)}} />
          <FieldSelection onYearChange={(year) => {this.onYearChange(year)}}/>
        </div>
        <div className="infoWrapper">
         <InfoBox selectedZone={this.state.selectedZone} />
         <TweetBox />
        </div>
			</div>
    );
  }
};

export default App;