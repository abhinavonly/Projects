import React from 'react';
import LoginForm from './Form/LoginForm' ;
import {connect} from 'react-redux';
import {userLoginRequest} from '../../actions/loginAction';
import {addFlashMessage} from '../../actions/flashMessageAction';
class LoginPage extends React.Component{
	render()
	{
		const {userLoginRequest,addFlashMessage} = this.props;
		return (
			<div className="row">
				<div className="col-md-4 col-md-offset-4">
					<LoginForm userLoginRequest={userLoginRequest} addFlashMessage={addFlashMessage} />
				</div>
			</div>
		);
	}
}

LoginPage.propTypes={
	userLoginRequest: React.PropTypes.func.isRequired,
	addFlashMessage: React.PropTypes.func.isRequired
}

export default connect((state)=>{return {}},{userLoginRequest,addFlashMessage})(LoginPage);