
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp'
import Dashboard from './components/Dashboard';

function App() { 
  return (
    <div className="App">
  <BrowserRouter>
  <Routes>
    <Route path ='/'       element={<Login></Login>} />
    <Route path ='/signup' element={<SignUp></SignUp>} />
    <Route path ='/dashboard' element={<Dashboard></Dashboard>} />
  </Routes>
</BrowserRouter>

    </div>
  );
}
export default App;
