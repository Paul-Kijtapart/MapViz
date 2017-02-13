import React from 'react';
import ReactDOM from 'react-dom';

// components
import App from './components/App.js';

// Json Data
import map_locations from 'maps/map.json';


ReactDOM.render(
	<App map_locations={map_locations}/>,
	document.getElementById('root')
);