import React from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
class NavigationBar  extends React.Component{
	render(){
		const islogin = this.props.isLogin;
		return(
			<nav className="navbar navbar-default">
			  <div className="container-fluid">
			  	<div className="navbar-header">
			  		<Link to="/" className="navbar-brand" > WebChat</Link>
			  	</div>
			  	<div className="collapse navbar-collapse">
			  		<ul className="nav navbar-nav navbar-right">
			  			{islogin?false:<li><Link to="/signup">Sign up</Link></li>}
						{islogin?false:<li><Link to="/login">Login</Link></li>}
						{islogin?<li><Link to="/logout">Logout</Link></li>:false}
			  		</ul>
			  	</div> 
			  </div>
			</nav>
		);	
	}
}

NavigationBar.propTypes = {
	isLogin: React.PropTypes.bool.isRequired
}
function mapStateToProps(state){
	return{
		isLogin:state.flashMessages.loggedIn
	}
}
export default connect(mapStateToProps)(NavigationBar);
