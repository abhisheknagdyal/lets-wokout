import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Home from './routes/Home';
import Navbar from './components/Navbar';

import './index.css';
import Login from './routes/Login';
import Signup from './routes/Signup';
function App() {
  const { user } =  useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className='pages'> 
          <Routes>
            <Route 
              path='/' 
              element={user ? <Home/> : <Navigate to='/login'/>}
            />
            <Route 
              path='/signup' 
              element={!user ? <Signup/> : <Navigate to='/'/>}
            />
            <Route 
              path='/login' 
              element={!user ? <Login/> : <Navigate to='/'/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
