import React from 'react';
import {
	Map,
	TileLayer,
	GeoJSON,
	LayersControl,
	Marker,
	Popup
} from 'react-leaflet';
import SentimentIcons from 'components/SentimentIcons.js';
import Control from 'react-leaflet-control';

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


class MainMap extends React.Component {
	style_2(feature) {
		var color = '#F0' + feature.properties.Name.length % 9 + 'F26';
		return {
			fillColor: color,
			weight: 3,
			opacity: 0,
			color: 'grey',
			dashArray: '',
			fillOpacity: 0.7
		};
	}

	setupInteraction(feature, layer) {
		layer.on({
			mouseover: function(e) {
				var layer = e.target;
				layer.setStyle({
					opacity: 1
				});
				layer.bringToFront();
			},
			mouseout: function(e) {
				e.target.setStyle({
					opacity: 0
				});
			},
			click: (e) => {
				const id = e.target.feature.id;
				const type = e.target.feature.properties.Name;
				const coords = e.target.feature.geometry.coordinates[0];
				const building_type = e.target.feature.Name;
				this.props.onZoneSelected(id, type, coords);
			}
		});
	}


	render() {
		const mapboxAccessToken = 'pk.eyJ1IjoibmFwb24iLCJhIjoiY2l6MzdneThwMDUwbjJ3bjE0a2QxanB1NyJ9.2zlCnkvfXLp5AAfoMbeQSQ';
		const position = [49.207, -122.912];
		const featureFn = (feature, layer) => {
			this.setupInteraction(feature, layer);
		};
		const building_type = this.props.selectedZone && this.props.selectedZone.type;
		const zone_name = this.props.selectedZone && this.props.selectedZone.id;

		return (
			<Map id="main_map"
				className="mainMap_full"
				center={position}
				zoom={13}
				zoomControl={false}
				touchZoom={false}
				doubleClickZoom={false}
				scrollWheelZoom={false}
				boxZoom={false}
				dragging={false}
			>
				<Control className="locationControl" position="topright" >
					<p> Building Type: {(building_type)? building_type : 'selected building type'} </p>
      			</Control>

      			<LayersControl position="bottomright">
					<LayersControl.Overlay name='Display Happiness Levels'>
						<p> Happiness Levels </p>
					</LayersControl.Overlay>
      			</LayersControl>

				<TileLayer
	      				url={'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken}
	   				id="mapbox.light"/>
	   				<GeoJSON
	   					data={AGRICULTURAL}
	   					style={this.style_2}
	   					onEachFeature={featureFn}
	   				/>
	   				<GeoJSON
	   					data={APARTMENT_HIGH}
	   					style={this.style_2}
	   					onEachFeature={featureFn}
	   				/>
	   				<GeoJSON
	   					data={APARTMENT_LOW}
	   					style={this.style_2}
	   					onEachFeature={featureFn}
	   				/>
	   				<GeoJSON
	   					data={COMMERCIAL}
	   					style={this.style_2}
	   					onEachFeature={featureFn}
	   				/>
	   				<GeoJSON
	   					data={DUPLEX}
	   					style={this.style_2}
	   					onEachFeature={featureFn}
	   				/>
	   				<GeoJSON
	   					data={INDUSTRIAL}
	   					style={this.style_2}
	   					onEachFeature={featureFn}
	   				/>
	   				<GeoJSON
	   					data={INSTITUTIONAL}
	   					style={this.style_2}
	   					onEachFeature={featureFn}
	   				/>
	   				<GeoJSON
	   					data={MIXED}
	   					style={this.style_2}
	   					onEachFeature={featureFn}
	   				/>
	   				<GeoJSON
	   					data={SINGLE}
	   					style={this.style_2}
	   					onEachFeature={featureFn}
	   				/>
	   				<GeoJSON
	   					data={TOWNHOUSE}
	   					style={this.style_2}
	   					onEachFeature={featureFn}
	   				/>
	   				<GeoJSON
	   					data={UNZONED}
	   					style={this.style_2}
	   					onEachFeature={featureFn}
	   				/>
	   				<SentimentIcons />
			</Map>);
	}
};

export default MainMap;