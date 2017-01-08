import React from 'react';
import Chat from './chat';
import { Link } from 'react-router';
import io from 'socket.io-client';
import axios from 'axios';


var socket = io.connect();

class MainPage extends React.Component {
    constructor() {
	  super();
      this.state = {
        topics: [],
        loading: true,
        error: null
      };
    }

    componentDidMount() {
      axios.get(`http://localhost:3000/trends`)
        .then(res => {
          let topics = res.data.map(obj => {
            if(obj.name[0] == '#'){
              obj.name = obj.name.substr(1);
            }
            return obj.name
          });
          
		  topics = topics.slice(0,15);
		  console.log(topics);


          // Update state to trigger a re-render.
          // Clear any errors, and turn off the loading indiciator.
          this.setState({
            topics,
            loading: false,
            error: null
          });
        })
        .catch(err => {
          // Something went wrong. Save the error in state and re-render.
          this.setState({
            loading: false,
            error: err
          });
        });
    }


    renderLoading() {
      return <div>Loading...</div>;
    }

    renderError() {
      return (
        <div>
          Uh oh: {this.state.error.message}
        </div>
      );
    }
    renderTopics() {
      if(this.state.error) {
        return this.renderError();
      }

      return (
        <div className="row">
        <ul className="topics">
          {this.state.topics.map(topic =>
            <Link to={`/chat/${topic}`} onClick={this.onClick.bind(this, topic)}><li key={topic} className="col-md-2">{topic}</li></Link>
          )}
        </ul>
         </div>
      );
    }

    onClick(val) {
        // call the server-side function 'adduser' and send one parameter (value of prompt)
        socket.emit('adduser', val);
    }
    render()
    {
	    return (
			    <div>
			    <h1> There u are!</h1>
			    {this.state.loading ?
			    this.renderLoading()
			    : this.renderTopics()}
			    </div>
		   );
    }
}

export default MainPage;
