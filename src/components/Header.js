import { Typography } from '@mui/material'
import React from 'react';
import { HiOutlineSparkles } from 'react-icons/hi'
import '../App.css'
const Header = () => {
  const headerStyle = {

    backgroundColor: 'transparent',
    width: '100%',
    height: '53px',
    position: 'sticky',
    display: 'flex',
    alignItems: 'center',
    padding: '15px'
  }
  return (
    <div className='Header' style={headerStyle}>
      <Typography variant="h3" sx={{ color: 'black', fontSize: '23px', fontWeight: '600' }}>Home</Typography>
      <div className="ms-auto sparklesLogo" >
        <HiOutlineSparkles style={{ fontSize: '23px' }} />
      </div>
    </div>
  )
}

export default Header