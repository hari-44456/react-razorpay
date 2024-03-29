import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Payment = () => {
	const [name, setName] = useState('');
	const [amount, setAmount] = useState('');
	const [email, setEmail] = useState('');

	useEffect(() => {
		const script = document.createElement('script');
		script.src = 'https://checkout.razorpay.com/v1/checkout.js';
		document.body.appendChild(script);
	}, []);

	const displayRazorpay = async (e) => {
		e.preventDefault();

		if (!name || !email || !amount) {
			alert('Please fill all the fields...');
			return;
		}
		// 'https://frozen-headland-04378.herokuapp.com/razorpay'
		axios
			.post('http://localhost:5000/razorpay', {
				name,
				email,
				amount,
			})
			.then(async (t) => {
				const data = t.data;

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
						alert(
							`Keep this with you 
							Payment Id: ${response.razorpay_payment_id}
							Order Id: ${response.razorpay_order_id}
							Payment Signature: ${response.razorpay_signature}`,
						);
					},
					prefill: {
						name: data.name,
						email: data.email,
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

export default Payment;
