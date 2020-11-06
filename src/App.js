import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
	const [name, setName] = useState('');
	const [amount, setAmount] = useState('');
	const [email, setEmail] = useState('');

	useEffect(() => {
		const script = document.createElement('script');
		script.src = 'https://checkout.razorpay.com/v1/checkout.js';
		document.body.appendChild(script);

		script.onload = () => console.log('script loaded');
		script.onerror = () => console.log('script not loaded');
	}, []);

	const displayRazorpay = async (e) => {
		e.preventDefault();

		if (!name || !email || !amount) {
			alert('Please fill all the fields...');
			return;
		}
		// console.log('in app.js', name, email, amount);

		axios
			.post('http://localhost:5000/razorpay', {
				name,
				email,
				amount,
			})
			.then(async (t) => {
				// console.log('then', t);
				const data = t.data;
				// console.log('data is ', data);

				const options = {
					key: process.env.REACT_APP_RAZORPAY_KEY,
					currency: data.currency,
					amount: data.amount,
					name: data.name,
					description: 'Event Participation',
					image:
						'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60',
					order_id: data.id,

					handler: function (response) {
						alert(response.razorpay_payment_id);
						alert(response.razorpay_order_id);
						alert(response.razorpay_signature);
					},
					prefill: {
						name,
					},
				};
				const paymentObject = new window.Razorpay(options);
				paymentObject.open();
			})
			.catch((err) => err.response);
	};

	return (
		<div>
			<form onSubmit={(e) => displayRazorpay(e)}>
				<label>Enter Name: </label> <br />
				<input
					type='text'
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
				/>{' '}
				<br />
				<label>Enter Email:</label> <br />
				<input
					type='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>{' '}
				<br />
				<label>Enter Amount:</label> <br />
				<input
					type='number'
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
					required
				/>
				<br />
				<input type='submit' value='PayNow' />
			</form>
		</div>
	);
};

export default App;
