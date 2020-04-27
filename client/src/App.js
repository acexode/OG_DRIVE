import React from 'react';
import Sidebar from './components/sidebar/sidebar';
import { withRouter, Switch, BrowserRouter, Route} from 'react-router-dom';
import Content from './components/content/content';
import {FileProvider} from './components/FileContext/FileContext'
import Login from './components/login/login';
import Signup from './components/Signup/signup';
import AuthGuard from "./components/login/AuthGuard"

const Main = withRouter(({ location }) => {
    return (
      <>     
      <Switch>
        <FileProvider>
          <AuthGuard path="/home" component={Content} />
          <AuthGuard path="/" exact component={Content} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </FileProvider>
      </Switch>
      </>
    )
      
     
   
})
function App() {
  return (
    <div className="wrapper">
    <BrowserRouter>
    <Main />
  </BrowserRouter>
  </div>
  );
}

export default App;
