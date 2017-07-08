import React, { Component } from 'react';
import { Progress } from 'reactstrap';

class FileUpload extends Component {
	render () {
		return (
			<div>
				<div className="text-center">{this.props.uploadValue.toFixed(0)}%</div>
				<Progress color="info" value={this.props.uploadValue} />
				<input type='file' onChange={this.props.onUpload}/>
			</div>
		);
	}
}

export default FileUpload;
