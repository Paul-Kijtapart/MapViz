import React from 'react';
import Slider from 'react-rangeslider';
// To include the default styles
import 'react-rangeslider/lib/index.css'

class FieldSelection extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 2013,
			reverseValue: 2013
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

		const labels = {
			2013: '2013',
			2014: '2014',
			2015: '2015',
			2016: '2016'
		};

		return (
			<div className="fieldSelection">
				<div className='slider-horizontal'>
					<Slider
		              min={2013}
		              max={2016}
		              step={1}
		              value={reverseValue}
		              labels={labels}
		              orientation='horizontal'
		              onChange={this.handleChangeReverse}
					/>
				</div>
			</div>
		);
	}
};

export default FieldSelection;