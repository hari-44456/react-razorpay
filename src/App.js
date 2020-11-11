import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Payment from './Payment';

const App = () => {
	return (
		<div>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/payment' component={Payment} />
			</Switch>
		</div>
	);
};

export default App;
