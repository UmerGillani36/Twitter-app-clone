import React, { useState, useEffect } from 'react'
import { FaTwitter } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { BsApple } from 'react-icons/bs';
import './login.css';
import { Paper, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../../firebase/config';

const Login = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [form, setform] = useState({ email: '', password: '' })

  const { email, password } = form;

  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate("/home");
    }
  }, []);


  const handleInput = (e) => {
    const { name, value } = e.target;
    setform({ ...form, [name]: value })
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    await firebase.signInWithEmailAndPass(email, password).then(() => navigate("/home"))
      .catch(() => alert("Email is not registered!!! Please Sign up"))

  }

  const signWithGoogle = async () => {
    await firebase.handleGoogle().then(() => navigate("/home"))
      .catch(() => alert("Email is not registered!!! Please Sign up"))
  }
  return (
    <div className='container'>
      <Paper elevation={3}
        sx={{
          width: '500px',
          height: '550px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '20px 60px'
        }}>
        <h2 className='logo' style={{ textAlign: 'center', fontSize: '40px', color: "#1d9bf0" }}><FaTwitter /></h2>

        <Typography variant='h3'>Sign in to Twitter</Typography>
        <div className='Google' onClick={signWithGoogle}>
          <FcGoogle style={{ fontSize: '22px', marginRight: '2px' }} />
          <span style={{ display: 'inline-block', fontSize: '14px', fontWeight: 'bold' }}> Sign in with Google</span>
        </div>
        <div className='Apple'>
          <BsApple style={{ fontSize: '22px', marginRight: '2px' }} />
          <span style={{ display: 'inline-block', fontSize: '14px', fontWeight: 'bold' }}> Sign in with Apple</span>
        </div>

        <span className='Or'>or</span>


        <TextField variant='outlined' type="text" name="email" label="Phone, email, or username" value={email} onChange={handleInput}></TextField>

        <TextField variant='outlined' name="password" type="password" label="Password" value={password} onChange={handleInput}></TextField>






        <Button variant="contained" onClick={handleSubmit} sx={{ borderRadius: '25px', height: '50px', fontSize: '18px', fontWeight: 'bold' }}> Login</Button>
        <span style={{ textAlign: 'center' }}>Don't have an account? <a style={{ color: '#1d9bf0', cursor: 'pointer' }} onClick={() => navigate('/register')}>Sign up</a></span>
      </Paper>

    </div>)
}

export default Login