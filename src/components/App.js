import React from 'react';
import {
	Map,
	TileLayer,
	GeoJSON
} from 'react-leaflet';
import $ from 'jquery';


// JSON
import AGRICULTURAL from 'maps/nw/AGRICULTURAL.json';
import APARTMENT_HIGH from 'maps/nw/APARTMENT-HIGH.json';
import APARTMENT_LOW from 'maps/nw/APARTMENT-LOW.json';
import COMMERCIAL from 'maps/nw/COMMERCIAL.json';
import DUPLEX from 'maps/nw/DUPLEX.json';
import INDUSTRIAL from 'maps/nw/INDUSTRIAL.json';
import INSTITUTIONAL from 'maps/nw/INSTITUTIONAL.json';
import MIXED from 'maps/nw/MIXED.json';
import SINGLE from 'maps/nw/SINGLE.json';
import TOWNHOUSE from 'maps/nw/TOWNHOUSE.json';
import UNZONED from 'maps/nw/UNZONED.json';


class App extends React.Component {

	style2_2(feature) {
		var color = '#F0' + feature.properties.Name.length % 9 + 'F26';
		console.log(feature)
		return {
			fillColor: color,
			weight: 2,
			opacity: 0,
			color: 'white',
			dashArray: '3',
			fillOpacity: 0.7
		};
	}

	render() {
		const mapboxAccessToken = 'pk.eyJ1IjoibmFwb24iLCJhIjoiY2l6MzdneThwMDUwbjJ3bjE0a2QxanB1NyJ9.2zlCnkvfXLp5AAfoMbeQSQ';
		const position = [49.207, -122.912];
		const map = (
			<Map id="main_map" center={position} zoom={13}>
				<TileLayer
      				url={'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken}
   					id="mapbox.light"
   				/>
   				<GeoJSON 
   					data={AGRICULTURAL}
   					style={this.style2_2}
   				/>
   				<GeoJSON 
   					data={APARTMENT_HIGH}
   					style={this.style2_2}
   				/>
   				<GeoJSON 
   					data={APARTMENT_LOW}
   					style={this.style2_2}
   				/>
   				<GeoJSON 
   					data={COMMERCIAL}
   					style={this.style2_2}
   				/>
   				<GeoJSON 
   					data={DUPLEX}
   					style={this.style2_2}
   				/>
   				<GeoJSON 
   					data={INDUSTRIAL}
   					style={this.style2_2}
   				/>
   				<GeoJSON 
   					data={MIXED}
   					style={this.style2_2}
   				/>
   				<GeoJSON 
   					data={SINGLE}
   					style={this.style2_2}
   				/>
   				<GeoJSON 
   					data={TOWNHOUSE}
   					style={this.style2_2}
   				/>
   				<GeoJSON 
   					data={UNZONED}
   					style={this.style2_2}
   				/>
			</Map>
		);
		return (
			<div className="mapApp">
				{map}
			</div>
		);
	}
};

export default App;