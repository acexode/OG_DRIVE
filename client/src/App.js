import React from 'react';
import Sidebar from './components/sidebar/sidebar';
import Header from './components/header/header';
import { withRouter, Switch, BrowserRouter, Route} from 'react-router-dom';
import Content from './components/content/content';
import Login from './components/login/login';

const Main = withRouter(({ location }) => {
    return (
      <>
      {(location.pathname != '/login') && (
        <>
         <Sidebar />         
        </>
      )}
      <Switch>
        <Route path="/home" component={Content} />
        <Route path="/" exact component={Content} />
        <Route path="/login" component={Login} />
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
