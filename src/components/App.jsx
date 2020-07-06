import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Protected from './Routes/Protected'
import Public from './Routes/Public'
import Page404 from './Pages/Page404'




import Home from './Pages/Home'
import Vehicule from './Pages/Vehicule'
import Parking from './Pages/Parking'
import Login from './Pages/Login'
import Register from './Pages/Register'





function App() {
  return (
    <Router>
      <Switch>
        <Protected path="/" exact component={Home}/>
        <Protected path="/vehicule" exact component={Vehicule}/>
        <Protected path="/parking" exact component={Parking}/>
        
        <Public path="/login"  component={Login}/>
        <Public path="/register"  component={Register}/>



        
        
        <Route component={Page404}/>
      </Switch>
    </Router>
  );
}

export default App;
