import './App.css';
import Home from './components/Pages/Home/Home';
import About from './components/Pages/About/About';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Appointment from './components/Pages/Appointment/Appointment';
import Register from './components/Pages/Login/Register/Register';
import Login from './components/Pages/Login/Login/Login';
import AuthProvider from './Context/AuthProvider/AuthProvider';
import PrivateRoute from './components/Pages/Login/PrivateRoute/PrivateRoute';
import Dashboard from './components/Pages/Dashboard/Dashboard/Dashboard';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path='/'>
              <Home></Home>
            </Route>
            <Route path='/home'>
              <Home></Home>
            </Route>
            <Route path='/about'>
              <About></About>
            </Route>
            <PrivateRoute path='/appointment'>
              <Appointment></Appointment>
            </PrivateRoute>
            <PrivateRoute path='/dashboard'>
             <Dashboard></Dashboard>
            </PrivateRoute>
            <Route path='/login'>
              <Login></Login>
            </Route>
            <Route path='/register'>
              <Register></Register>
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
     
    </div>
  );
}

export default App;
