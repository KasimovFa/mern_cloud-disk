import React, { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import { useAppDispatch} from './hooks/hooks';
import './app.css';
import AppRouter from './components/AppRouter/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import { auth } from './api/UserApi';

function App() {
  const dispatch = useAppDispatch();


  useEffect(() => {
     dispatch(auth())
  },[])

  return ( 
    <BrowserRouter>
        <Navbar />
        <AppRouter />
    </BrowserRouter>
  );
}

export default App;
