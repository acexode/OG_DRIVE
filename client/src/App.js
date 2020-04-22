import React from 'react';
import Sidebar from './components/sidebar/sidebar';
import Header from './components/header/header';
import { withRouter, Switch, BrowserRouter, Route} from 'react-router-dom';
import Content from './components/content/content';
import Login from './components/login/login';
import Signup from './components/Signup/signup';

const Main = withRouter(({ location }) => {
    return (
      <>
      {(location.pathname != '/login' && location.pathname != '/signup') && (
        <>
         <Sidebar />         
        </>
      )}
      <Switch>
        <Route path="/home" component={Content} />
        <Route path="/" exact component={Content} />
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
