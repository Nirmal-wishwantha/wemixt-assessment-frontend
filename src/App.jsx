import './App.css'
import Home from './pages/Home';
import { useEffect, useState } from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'
import { Route, Routes, Navigate } from 'react-router-dom';
import Members from './pages/Members';


function App() {

  const [login, setLogin] = useState(false);

  useEffect(() => {

    const token = localStorage.getItem('wemixt');
    // console.log(token);

    if (token) {
      setLogin(true);
    } else {
      setLogin(false);
    }

  },[])

  return (
    <div>

      {
        login ? <Main /> : <Routes>

          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='*' element={<Navigate to='/login' />} />
        </Routes>
      }



    </div >

  )
}

export default App




function Main() {
  return (
    <div>
      <Home />

      
    </div>

  )
}