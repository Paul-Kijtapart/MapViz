import React from 'react';
import L from 'leaflet';
import {
  Marker,
  LayerGroup
} from 'react-leaflet';
import $ from 'jquery';

class SentimentIcons extends React.Component {
  constructor() {
    super();
    this.state = {
      interval: null,
      areas: []
    }
  }

  shouldComponentUpdate() {
    return this.state.areas.length == 0;
  }

  componentDidMount() {
    this.fetch();
    // var interval = setInterval(() => {this.fetch()}, 7000);
    // this.setState({interval: interval, areas: this.state.areas});
  }
  componentWillUnmount() {
    // clearInterval(this.state.interval);
  }
  fetch() {
    $.ajax({
      url: "http://localhost:8000/polls/sentiment",
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({areas: data.areas});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err);
      }.bind(this)
    });
  }
  render() {
    const displayArea = this.state.areas.map(function(area, index) {
      const icon = Math.random() < 0.65?
        L.divIcon({className: 'sentiment-positive'}) :
        L.divIcon({className: 'sentiment-negative'});
      return <Marker key={index} position={area} icon={icon} />
    });
    return (<LayerGroup>{displayArea}</LayerGroup>);
  }
};

export default SentimentIcons;