import React from 'react';
import $ from 'jquery';

class InfoBox extends React.Component {
  render() {
    if (this.props.selectedZone) {
      return (
        <div>
          ID: {this.props.selectedZone.id}<br />
          Type: {this.props.selectedZone.type}<br />
          Coordinates: {this.props.selectedZone.coords}
        </div>
      );
    } else {
      return (<div>"Select a zone to view more detail."</div>);
    }
  }
};

export default InfoBox;