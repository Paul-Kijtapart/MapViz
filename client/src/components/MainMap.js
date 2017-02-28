import React from 'react';
import {
	Map,
	TileLayer,
	GeoJSON
} from 'react-leaflet';
import $ from 'jquery';
import SentimentIcons from 'components/SentimentIcons.js'

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

	constructor() {
		super();
		this.state = {
			scores: {},
			oldYear: undefined
		};
	}

	componentWillMount() {
		this.fetch(this.props.year);
	}

	componentDidUpdate(prevProps, prevState) {
		this.fetch(this.props.year);
	}

	fetch(year) {
		if (this.state.oldYear === year) return;
		return $.ajax({
      url: "http://localhost:8000/polls/score/" + year,
      dataType: 'json',
      cache: false,
      success: function(data) {
      	let scores = {}
      	data.map((d) => {
      		scores[d.name] = d
      	});
        this.setState({scores: scores, oldYear: year});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err);
      }.bind(this)
    });
	}

	style_2(feature) {
		let color = '#000000';
		let scores = this.state.scores;
		if (scores && scores[feature.id]) {
			let score = scores[feature.id].score;
			let r = 0;
			let g = score * 255/5;
			let b = 0;
			color = 'rgb(' + r + ',' + g + ',' + b + ')';
		}
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
				let feature = e.target.feature;
				let id = feature.id;
				let type = feature.properties.Name;
				let score = this.state.scores[feature.id].score;
				let safeLevel = {
					5: 'VERY SAFE',
					4: 'SAFE',
					3: 'NORMAL',
					2: 'RISKY',
					1: 'VERY DANGEROUS'
				};
				let selectedZone = {
					id, type, score,
					cond:  safeLevel[score]
				};
				this.props.onZoneSelected(selectedZone);
			}
		});
	}


	render() {
		const mapboxAccessToken = 'pk.eyJ1IjoibmFwb24iLCJhIjoiY2l6MzdneThwMDUwbjJ3bjE0a2QxanB1NyJ9.2zlCnkvfXLp5AAfoMbeQSQ';
		const position = [49.207, -122.912];
		const featureFn = (feature, layer) => {
			this.setupInteraction(feature, layer);
		};
		const colorFn = this.style_2.bind(this);
		return (
			<Map id="main_map"
				className="mainMap_full"
				center={position}
				zoom={13}
				zoomControl={false}
				touchZoom={false}
				doubleClickZoom={false}
				boxZoom={false}
			>
				<TileLayer
	      				url={'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken}
	   				id="mapbox.light"/>
	   				<GeoJSON
	   					data={AGRICULTURAL}
	   					style={colorFn}
	   					onEachFeature={featureFn}
	   				/>
	   				<GeoJSON
	   					data={APARTMENT_HIGH}
	   					style={colorFn}
	   					onEachFeature={featureFn}
	   				/>
	   				<GeoJSON
	   					data={APARTMENT_LOW}
	   					style={colorFn}
	   					onEachFeature={featureFn}
	   				/>
	   				<GeoJSON
	   					data={COMMERCIAL}
	   					style={colorFn}
	   					onEachFeature={featureFn}
	   				/>
	   				<GeoJSON
	   					data={DUPLEX}
	   					style={colorFn}
	   					onEachFeature={featureFn}
	   				/>
	   				<GeoJSON
	   					data={INDUSTRIAL}
	   					style={colorFn}
	   					onEachFeature={featureFn}
	   				/>
	   				<GeoJSON
	   					data={INSTITUTIONAL}
	   					style={colorFn}
	   					onEachFeature={featureFn}
	   				/>
	   				<GeoJSON
	   					data={MIXED}
	   					style={colorFn}
	   					onEachFeature={featureFn}
	   				/>
	   				<GeoJSON
	   					data={SINGLE}
	   					style={colorFn}
	   					onEachFeature={featureFn}
	   				/>
	   				<GeoJSON
	   					data={TOWNHOUSE}
	   					style={colorFn}
	   					onEachFeature={featureFn}
	   				/>
	   				<GeoJSON
	   					data={UNZONED}
	   					style={colorFn}
	   					onEachFeature={featureFn}
	   				/>
	   				<SentimentIcons />
			</Map>);
	}
};

export default MainMap;