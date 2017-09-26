import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route, browserHistory, Link, IndexRedirect } from 'react-router';
import Home from './home';

const container = (props) => (
	<div>
		{props.children}
	</div>
);

const error = () => (
	<div style={{marginTop: '5%', textAlign: 'center'}}>
		Whoops! Took a wrong turn.<br />
		<Link to="/">Let's go home.</Link>
	</div>
);

const Routing = () => (
	<Router history={browserHistory}>
		<Route path="/" component={container}>
			 <IndexRoute component={Home} />
		</Route>

		<Route path="*" component={error} />
	</Router>
);

ReactDOM.render(<Routing />, document.getElementById('app'));



