import './App.css';
import { Route, Routes } from 'react-router-dom';
import View from './Components/View/View';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';

function App() {
  return (
    <div className="app">
      <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/user/:id' element={<View/>} />
    </Routes>
    </div>
  );
}

export default App;
