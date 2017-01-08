import React from 'react';
// import axios from 'axios';
import classnames from 'classnames';
import TextFieldGroup from '../../common/TextFieldGroup';
import {browserHistory} from 'react-router';
class Signup extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			useremail:'',
			password: '',
			passwordconfirm:'',
			nickname:'',
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
		this.props.userSignupRequest({useremail:this.state.useremail,password:this.state.password,
			passwordconfirm:this.state.passwordconfirm,
			nickname:this.state.nickname}).then(
			(success)=>{
				browserHistory.push('login');
			},
			(err)=>this.setState({errors:err.response.data.errors,isLoading:false}));
			//(err)=>{ console.log(err.response.data.errors);})
	}
	render(){
		const {errors} = this.state;
		return (
			<form onSubmit={this.onSubmit}>
				<h1> Join the World!</h1>
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
				<TextFieldGroup
					error = {errors.passwordconfirm}
					label = "Verify Password"
					onChange = {this.onChange}
					value = {this.state.passwordconfirm}
					field = "passwordconfirm"
					type = 'password'
				/>
				<TextFieldGroup
					error = {errors.name}
					label = "Nickname"
					onChange = {this.onChange}
					value = {this.state.nickname}
					field = "nickname"
				/>
				<div className="form-group">
					<button disabled={this.state.isLoading} className="btn btn-primary btn-lg">
						Sign up
					</button>
				</div>
			</form>
		);
	}
}
Signup.propTypes={
	userSignupRequest: React.PropTypes.func.isRequired
}
export default Signup;

