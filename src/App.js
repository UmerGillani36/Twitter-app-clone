import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Join from './pages/Join';
import Home from './pages/Home';
import Login from '../src/components/login/Login';
import Register from '../src/components/register/Register';
import NotFound from './components/NotFound';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>

      <div>
        <Routes>

          <Route path='/' element={<Join />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>


      </div>
    </BrowserRouter>
  );
}

export default App;
