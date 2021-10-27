

import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard'

function App(props) {
  
  return (
    <BrowserRouter>
        <div style={window.innerWidth > 750 ? { width: "100%", height: "100%", padding: "0px 20px 20px 20px" } : { width: "100%", height: "100%", padding: "0px 20px 20px 20px" }}>
          <div >
            <Switch>
              <Route exact path='/' component={Dashboard} />
              {/* <Route path='/signin' component={SignIn} /> */}
            </Switch>
          </div>
        </div>
      </BrowserRouter>
  );
}

export default App;
