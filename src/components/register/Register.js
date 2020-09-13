import React, { useState } from 'react';
import './Register.css';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../../firebase';

const Register = () => {
  const [email, setEmail] = useState('');
  const [confEmail, setConfEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [error, setError] = useState('');

  const history = useHistory();

  const handleRegister = (e) => {
    e.preventDefault();
    if ((email || password || confEmail || confPassword) === '') {
      console.log('err');
      setError('Some of the fields are empty');
      return;
    }
    if (email !== confEmail) {
      setError('Emails do not match');
      return;
    }

    if (password !== confPassword) {
      setError('Passwords do not match');
      return;
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);
        if (auth) {
          history.push('/');
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className='register'>
      <Link to='/'>
        <img
          alt='logo'
          className='register__logo'
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1600px-Amazon_logo.svg.png'
        />
      </Link>
      <div className='register__cnt'>
        <h1>Register</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Confirm e-mail</h5>
          <input
            type='text'
            value={confEmail}
            onChange={(e) => setConfEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <h5>Confirm password</h5>
          <input
            type='password'
            value={confPassword}
            onChange={(e) => setConfPassword(e.target.value)}
          />

          <p className='register__error'>{error}</p>

          <button
            type='submit'
            className='register__registerButton'
            onClick={handleRegister}
          >
            Sign in
          </button>

          <p className='register__agreement'>
            By registering you agree to AMAZON'S CLONE Conditions of
            Use & Sale. Please see out Privacy Notice, out Cookies
            Notice and out Interest-Based Ads
          </p>

          <button
            className='register__signInButton'
            onClick={() => history.push('/login')}
          >
            Sign in into your Amazon account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
