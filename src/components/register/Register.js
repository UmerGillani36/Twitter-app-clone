import {
  TextField,
  Paper,
  Typography,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,

} from '@mui/material';
import { FaTwitter } from 'react-icons/fa';
import React, { useState } from 'react';
import './register.css';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../../firebase/config';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

import { getAuth } from 'firebase/auth';


const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const { name, email, password, phone } = form;
  const [isPhone, setIsPhone] = useState(false);
  const [otpFlag, setOtpFlag] = useState(false);
  const [otp, setOtp] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const currentYear = new Date().getFullYear();
  const startingYear = currentYear - 60;
  const Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const Days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  const Years = [];
  const navigate = useNavigate();
  const firebase = useFirebase();

  const app = firebase.app;
  const auth = getAuth(app);


  for (let i = startingYear; i <= currentYear; i++) {
    Years.unshift(i);
  }

  const handleMonth = (e) => {

    setMonth(e.target.value)
  }
  const handleDay = (e) => {

    setDay(e.target.value)
  }
  const handleYear = (e) => {

    setYear(e.target.value)
  }

  const handleMode = () => {

    setIsPhone(!isPhone);

  }
  const handleInput = (e) => {
    const { name, value } = e.target;

    setForm((form) => ({ ...form, [name]: value }))
  }
  const handleOTP = (e) => {
    setOtp(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isPhone) {
      if (phone.length == 0 || phone.length == 11) {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', { 'size': 'invisible' }, auth);

        const phoneNumber = "+92" + phone.substring(1);
        const appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
          .then((confirmationResult) => {

            window.confirmationResult = confirmationResult

            setOtpFlag(true);
          }
          ).catch((error) => {
            alert("Something Went Wrong Please try again")
            // console.log(error.message)
            setOtpFlag(false)
          })

      }
      else {
        alert("Please Enter Correct Phone Number");
      }


    }
    else {

      firebase.SignupUserWithEmailAndPassword(email, password).then((currentUser) => {
        console.log("user is ", currentUser)


        navigate("/login")

      })
        .catch(() => alert("Somthing Went Wrong. Please try later!!!"))


    }

  }
  const handleSubmitPhoneOtp = (e) => {
    e.preventDefault();
    window.confirmationResult.confirm(otp).then((element) => {
      console.log("user is ", element)
      navigate("/home")
    }
    ).catch(() => {
      alert("Please Enter Correct OTP")
    })
  }



  return (
    <div className='container'>
      {!otpFlag ? (
        <Paper elevation={3}
          sx={{
            width: '600px',
            height: '700px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '20px 60px'
          }}>
          <h2 className='logo' style={{ textAlign: 'center', fontSize: '40px', color: "#1d9bf0" }}><FaTwitter /></h2>

          <Typography variant='h3'>Create your account</Typography>
          <TextField variant='outlined' type="text" name="name" label="Username" value={name} onChange={handleInput}></TextField>
          {/* <TextField variant='outlined' type="email" name="" label="email" value={email} onChange={handleInput}></TextField> */}
          {isPhone ? (
            <>
              <TextField variant='outlined' type="text" name="phone" label="Phone" value={phone} onChange={handleInput}></TextField>
              <div id="recaptcha-container"></div>
            </>
          ) :
            (
              <TextField variant='outlined' type="email" name="email" label="Email" value={email} onChange={handleInput}></TextField>

            )
          }
          <a href='#' onClick={handleMode} style={{ textAlign: 'end' }}>
            {isPhone ? "Use email instead" : "Use phone instead"}
          </a>
          <TextField variant='outlined' name="password" type="password" label="Password" value={password} onChange={handleInput}></TextField>




          <Typography variant='h6' sx={{ fontSize: '20px', fontWeight: 'bold' }}>Date of birth</Typography>
          <Typography variant="body1" sx={{ fontSize: '12px', fontWeight: 'bold' }}>This will not be shown publicly.
            Confirm your own age, even if this account is for a business, a pet,
            or something else.</Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', marginTop: '20px' }}>
            <FormControl >
              <InputLabel id="month-label">Month</InputLabel>
              <Select
                labelId="month-label"
                id="month"
                value={month}
                label="Month"
                onChange={handleMonth}
                sx={{ width: '220px' }}
              >

                {

                  Months.map((ele) => (

                    <MenuItem value={ele}>{ele}</MenuItem>

                  ))
                }

              </Select>
            </FormControl>


            <FormControl >

              <InputLabel id="day-label">Day</InputLabel>
              <Select
                labelId="day-label"
                id="day"
                value={day}
                label="Day"
                onChange={handleDay}
                sx={{ width: '110px' }}

              >
                {
                  Days.map((ele) => (

                    <MenuItem value={ele}>{ele}</MenuItem>
                  )
                  )
                }
              </Select>
            </FormControl>

            <FormControl >

              <InputLabel id="year-label">Year</InputLabel>
              <Select
                labelId="year-label"
                id="year"
                value={year}
                label="Year"
                onChange={handleYear}
                sx={{ width: '110px' }}

              >
                {
                  Years.map((ele, index) => (
                    <MenuItem key={index} value={ele}>{ele}</MenuItem>

                  ))
                }

              </Select>
            </FormControl>

          </Box>
          {!isPhone ? (
            <Button variant="contained" onClick={handleSubmit} sx={{ borderRadius: '25px', height: '50px', fontSize: '18px', fontWeight: 'bold' }}> Create account</Button>

          ) : (

            <Button variant="contained" onClick={handleSubmit} sx={{ borderRadius: '25px', height: '50px', fontSize: '18px', fontWeight: 'bold' }}> Next</Button>
          )}
          <span style={{ textAlign: 'center' }}>Do you have an account? <a style={{ color: '#1d9bf0', cursor: 'pointer' }} onClick={() => navigate('/login')}>Sign in</a></span>


        </Paper>) : (<Paper elevation={3}
          sx={{
            width: '600px',
            height: '400px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '20px 60px'
          }}>
          <h2 className='logo' style={{ textAlign: 'center', fontSize: '40px', color: "#1d9bf0" }}><FaTwitter /></h2>

          <Typography variant='h3'>We sent you a code</Typography>
          <Typography variant='h6'>Enter it below to verify {phone}</Typography>
          <TextField variant='outlined' type="text" name="otp" label="Verification code" value={otp} onChange={handleOTP}></TextField>
          <a style={{ color: '#1d9bf0', cursor: 'pointer' }}>Didn't receive SMS?</a>
          <Button variant="contained" onClick={handleSubmitPhoneOtp} sx={{ borderRadius: '25px', height: '50px', fontSize: '18px', fontWeight: 'bold' }}> Create account</Button>



        </Paper>)
      }


    </div>
  )
}

export default Register