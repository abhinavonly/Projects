import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import cookie from 'react-cookie';
import {delFlashMessage} from '../../actions/deleteMessageAction';
class LogoutPage extends Component {

  componentWillMount() {
  	cookie.remove("token",{ path: '/' });
    this.props.dispatch(delFlashMessage());
    this.props.router.replace('/');
  }

  render() {
    return null
  }
}
LogoutPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired
}

export default connect({delFlashMessage})(LogoutPage);
