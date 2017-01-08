import React from 'react';
import NavigationBar from './common/navigationBar';
import FlashMessage from './flash/FlashMessage';
class App extends React.Component{
    render(){
        return (
        	<div className="container">
        	<NavigationBar />
        	<FlashMessage/>
        	{this.props.children}
        	</div>
        );
    }
}

export default App;