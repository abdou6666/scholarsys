import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Register() {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ confirmPassword, setConfirmPassword ] = useState('');
	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!email || !password || password !== confirmPassword) {
			return <div> verify form </div>;
		}
		const response = await fetch('http://localhost:8000/user', {
			method: 'post',
			body: JSON.stringify({
				email,
				password
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		});
		if (response.ok) {
			navigate('/login');
		}
	};

	return (
		<div>
			<h1>Register</h1>
			<form onSubmit={handleSubmit}>
				<input
					placeholder="email"
					type="text"
					name="email"
					onChange={(e) => {
						setEmail(e.target.value);
					}}
					value={email}
				/>
				<input
					placeholder="password"
					type="password"
					name="password"
					onChange={(e) => {
						setPassword(e.target.value);
					}}
					value={password}
				/>
				<input
					placeholder="confirm password"
					type="password"
					name="confirmPassword"
					onChange={(e) => {
						setConfirmPassword(e.target.value);
					}}
					value={confirmPassword}
				/>
				<button type="submit">submit</button>
			</form>
		</div>
	);
}

export default Register;
