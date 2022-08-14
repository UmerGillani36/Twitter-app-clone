import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { FaTwitter } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { BsApple } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const Join = () => {
  const navigate = useNavigate();
  return (
    <div className='container-fluid'>

      {/* //Image */}
      <div className='Image'>
        <h1><FaTwitter /></h1>
      </div>

      {/* Login/Signup */}
      <div className='Happening'>
        <h2 className='logo'><FaTwitter /></h2>
        <h1 className='HeadingOne'>Happening now</h1>
        <h2 className='HeadingTwo'>Join Twitter today.</h2>

        <div className='Registration'>
          <div className='Google'>
            <FcGoogle style={{ fontSize: '22px', marginRight: '2px' }} />
            <span style={{ display: 'inline-block', fontSize: '14px', fontWeight: 'bold' }}> Sign up with Google</span>
          </div>
          <div className='Apple'>
            <BsApple style={{ fontSize: '22px', marginRight: '2px' }} />
            <span style={{ display: 'inline-block', fontSize: '14px', fontWeight: 'bold' }}> Sign up with Apple</span>
          </div>

          <span className='Or'>or</span>

          <Button variant='primary' className='Button' onClick={() => navigate('/register')}>Sign up with mobile or email</Button>
          <small>By signing up, you agree to the Terms of Service
            and Privacy Policy, including Cookie Use.</small>

          <h2 className='HaveAccount'>Already have an account?</h2>

          <Button variant='outline-primary' className='Button' onClick={() => navigate('/login')}>Sign in</Button>

        </div>
      </div>

    </div>
  )
}

export default Join