import React from 'react';
import $ from 'jquery';

class InfoBox extends React.Component {
  render() {
    if (this.props.selectedZone) {
      let selectedZone = this.props.selectedZone;
      return (
        <div className="infoBox">
          ID: {selectedZone.id}<br />
          Type: {selectedZone.type}<br />
          Neighbourhood condition: {selectedZone.cond}<br />
          Score: {selectedZone.score}
        </div>
      );
    } else {
      return (<div className="infoBox">"Select a zone to view more detail."</div>);
    }
  }
};

export default InfoBox;