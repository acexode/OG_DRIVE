import React from 'react';
import Sidebar from './components/sidebar/sidebar';
import { withRouter, Switch, BrowserRouter, Route} from 'react-router-dom';
import Content from './components/content/content';
import Login from './components/login/login';
import Signup from './components/Signup/signup';
import AuthGuard from "./components/login/AuthGuard"

const Main = withRouter(({ location }) => {
    return (
      <>
      {(location.pathname != '/login' && location.pathname != '/signup') && (
        <>
         <Sidebar />         
        </>
      )}
      <Switch>
        <AuthGuard path="/home" component={Content} />
        <AuthGuard path="/" exact component={Content} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
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
