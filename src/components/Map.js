import React from 'react';
import {
	Map,
	Marker,
	Popup,
	TileLayer,
	GeoJSON
} from 'react-leaflet';
import $ from 'jquery';

// Constants
import AGRICULTURAL from 'maps/nw/AGRICULTURAL.js';
import APARTMENT_HIGH from 'maps/nw/APARTMENT-HIGH.js';
import APARTMENT_LOW from 'maps/nw/APARTMENT-LOW.js';


class App extends React.Component {
	render() {
		const mapboxAccessToken = 'pk.eyJ1IjoibmFwb24iLCJhIjoiY2l6MzdneThwMDUwbjJ3bjE0a2QxanB1NyJ9.2zlCnkvfXLp5AAfoMbeQSQ';
		const position = [49.207, -122.912];
		var temp = {
			id: 'mapbox.light'
		};


		const map = (
			<Map center={position} zoom={13}>
				<TileLayer
      				url={'https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken}
   					
   				/>
   				<GeoJSON 
   					data={APARTMENT_HIGH}
   				/>
   				<GeoJSON 
   					data={APARTMENT_LOW}
   				/>
   				<GeoJSON 
   					data={AGRICULTURAL}
   				/>
			</Map>
		);
		// console.log(this.props.map_locations);
		return map;
	}
};

export default App;