import { useEffect } from 'react';
import { Routes, Route, NavLink, Link, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
function App() {
	useEffect(() => console.log('test'));
	return (
		<div className="App">
			<NavLink to="/" style={({ isActive }) => (isActive ? { color: 'red' } : undefined)}>
				Home
			</NavLink>
			<NavLink to="login" style={({ isActive }) => (isActive ? { color: 'red' } : undefined)}>
				Login
			</NavLink>
			<NavLink
				to="register"
				style={({ isActive }) => (isActive ? { color: 'red' } : undefined)}>
				Register
			</NavLink>

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
			</Routes>
		</div>
	);
}

export default App;
