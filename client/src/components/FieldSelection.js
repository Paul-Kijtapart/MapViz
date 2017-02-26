import React from 'react';
import Slider from 'react-rangeslider';
// To include the default styles
import 'react-rangeslider/lib/index.css'

class FieldSelection extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 25,
			reverseValue: 8
		}

		this.handleChangeReverse = this.handleChangeReverse.bind(this);
	}

	handleChangeReverse(value) {
		this.setState({
			reverseValue: value
		});
	}

	render() {
		const {
			value,
			reverseValue
		} = this.state;

		return (
			<div className="fieldSelection">
				<div className='slider-horizontal'>
					<Slider
		              min={0}
		              max={100}
		              step={10}
		              value={reverseValue}
		              orientation='horizontal'
		              onChange={this.handleChangeReverse}
					/>
					<div className='value'>{reverseValue}</div>
				</div>
				<h1> I am fieldSelection. </h1>
			</div>
		);
	}
};

export default FieldSelection;