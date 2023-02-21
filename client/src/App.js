import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Checkout from './components/Checkout';
import Success from './components/Success';
import Cancel from './components/Cancel';
import Order from './components/Order';
import Dashboard from './components/dashboard';

function App() {

  const SERVER_URL = 'http://localhost:4242';

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Order serverUrl={SERVER_URL}/>}/>
          <Route exact path="/checkout" element={<Checkout serverUrl={SERVER_URL}/>}/>
          <Route exact path="/success" element={<Success serverUrl={SERVER_URL}/>}/>
          <Route exact path="/cancel" element={<Cancel serverUrl={SERVER_URL}/>}/>
          <Route exact path="/dashboard" element={<Dashboard serverUrl={SERVER_URL}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
