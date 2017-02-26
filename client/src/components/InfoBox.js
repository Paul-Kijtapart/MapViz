import React from 'react';
import $ from 'jquery';

class InfoBox extends React.Component {
  render() {
    if (this.props.selectedZone) {
      return (
        <div className="infoBox">
          ID: {this.props.selectedZone.id}<br />
          Type: {this.props.selectedZone.type}<br />
          Neighbourhood condition: {this.props.selectedZone.coords}
        </div>
      );
    } else {
      return (<div className="infoBox">"Select a zone to view more detail."</div>);
    }
  }
};

export default InfoBox;