import React from 'react';
import L from 'leaflet';

class Map extends React.Component {

	render() {
		console.log(this.props.map_locations);
		return (
			<div className="map">
				<p> I am Map.  YOYO </p>
			</div>
		);
	}
};

export default Map;