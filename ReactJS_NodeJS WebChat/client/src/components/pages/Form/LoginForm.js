import React from 'react';
import TextFieldGroup from '../../common/TextFieldGroup';
import {browserHistory} from 'react-router';
import cookie from 'react-cookie';
class Login extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			useremail:'',
			password: '',
			errors:{},
			isLoading:false
		}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	onChange(e){
		this.setState({[e.target.name]:e.target.value});
	}
	onSubmit(e){
		e.preventDefault();
		this.setState({errors:{},isLoading:true});
		this.props.userLoginRequest({useremail:this.state.useremail,password:this.state.password}).then(
			(success)=>{
				this.props.addFlashMessage({
					type: 'success',
					text: 'Welcome, ' + success.data.user,
					token: success.data.token
				});
				cookie.save('token',success.data.token,{path:'/'});
				browserHistory.push('/');
			},
			(err)=>this.setState({errors:err.response.data.errors,isLoading:false}));
	}
	render(){
		const {errors} = this.state;
		return (
			<form onSubmit={this.onSubmit}>
				<h1>Login</h1>
				<TextFieldGroup
					error = {errors.email}
					label = "Email"
					onChange = {this.onChange}
					value = {this.state.useremail}
					field = "useremail"
				/>
				<TextFieldGroup
					error = {errors.password}
					label = "Password"
					onChange = {this.onChange}
					value = {this.state.password}
					field = "password"
					type = 'password'
				/>
				<div className="form-group">
					<button disabled={this.state.isLoading} className="btn btn-primary btn-lg">
						Login
					</button>
				</div>
			</form>
		)
	}
}

Login.propTypes={
	userLoginRequest: React.PropTypes.func.isRequired,
	addFlashMessage: React.PropTypes.func.isRequired
}

export default Login;