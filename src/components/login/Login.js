import React, { useState } from 'react';
import './Login.css';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../../firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const handleSignIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push('/');
      })
      .catch((err) => {
        console.warn(err.message);
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);
        if (auth) {
          history.push('/');
        }
      })
      .catch((err) => {
        console.warn(err.message);
      });
  };

  return (
    <div className='login'>
      <Link to='/'>
        <img
          alt='logo'
          className='login__logo'
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1600px-Amazon_logo.svg.png'
        />
      </Link>
      <div className='login__cnt'>
        <h1>Sign in</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type='submit'
            className='login__signInButton'
            onClick={handleSignIn}
          >
            Sign in
          </button>

          <p>
            By signing-in you agree to AMAZON'S CLONE Conditions of
            Use & Sale. Please see out Privacy Notice, out Cookies
            Notice and out Interest-Based Ads
          </p>

          <button
            className='login__registerButton'
            onClick={handleRegister}
          >
            Create your Amazon account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
