import React, { useState } from 'react';

function Login() {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await fetch('http://localhost:8000/login', {
			method: 'POST',
			body: JSON.stringify({
				email: email,
				password: password
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		});
		const data = await response.json();
		console.log(data);
	};
	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="email"
					onChange={(e) => {
						setEmail(e.target.value);
					}}
					value={email}
				/>
				<input
					type="password"
					placeholder="password"
					onChange={(e) => {
						setPassword(e.target.value);
					}}
					value={password}
				/>
				<button type="submit">log in</button>
			</form>
		</div>
	);
}

export default Login;
