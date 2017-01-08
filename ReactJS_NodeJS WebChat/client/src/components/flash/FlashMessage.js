import React from 'react';
import {connect} from 'react-redux';
class FlashMessage extends React.Component {
	render(){
		const {id,type,text,token} = this.props.message;
		if(text===null)
		{
			return null;
		}
		else{
			return(
				<div>
				</div>
			);
		}
	}
}

FlashMessage.propTypes = {
	message: React.PropTypes.object.isRequired
}

function mapStateToProps(state){
	return{
		message:state.flashMessages
	}
}
export default connect(mapStateToProps)(FlashMessage);
