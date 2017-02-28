import React from 'react';
import Slider from 'react-rangeslider';
// To include the default styles
import 'react-rangeslider/lib/index.css'

class FieldSelection extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 2011,
			reverseValue: 2011,
			onYearChange: this.props.onYearChange
		}

		// this.handleChangeReverse = this.handleChangeReverse.bind(this);
	}

	handleChangeReverse(value) {
		this.props.onYearChange(this.state.value)
	}

	handleOnChange(value) {
    this.setState({
      value
    })
  }

	render() {
		const {
			value,
			reverseValue
		} = this.state;

		const labels = {
			2011: '2011',
			2012: '2012',
			2013: '2013',
			2014: '2014',
			2015: '2015',
			2016: '2016'
		};

		return (
			<div className="fieldSelection">
				<div className='slider-horizontal'>
					<Slider
		              min={2011}
		              max={2016}
		              step={1}
		              value={value}
		              labels={labels}
		              orientation='horizontal'
									onChange={(val) => { this.handleOnChange(val) }}
									onChangeComplete={() => { this.handleChangeReverse()}}
					/>
				</div>
			</div>
		);
	}
};

export default FieldSelection;