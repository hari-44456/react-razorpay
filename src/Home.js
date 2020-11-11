import React from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
	const history = useHistory();
	return (
		<div>
			<h1>Techumen-2020</h1>

			<button onClick={(e) => history.push('/payment')}>
				Go To Payment
			</button>
		</div>
	);
};

export default Home;
