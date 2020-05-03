import React from 'react';
import css from './App.css'
import Sidebar from './components/sidebar/sidebar';
import { withRouter, Switch, BrowserRouter, Route} from 'react-router-dom';
import Content from './components/content/content';
import {FileProvider} from './components/FileContext/FileContext'
import Login from './components/login/login';
import Signup from './components/Signup/signup';
import AuthGuard from "./components/login/AuthGuard"
import Folder from './components/content/folder';
import { useHistory } from 'react-router-dom';
import Shared from './components/content/shared';
import Trash from './components/content/trash';
import Recent from './components/content/recent';
import Starred from './components/content/starred';
var jwtDecode = require('jwt-decode');
// let history = useHistory()  
const token = localStorage.getItem('token')
const lastclear = localStorage.getItem('LastClear')
let exp = {...jwtDecode(token)}

const Main = withRouter(({ location }) => {
  let history = useHistory()  
  if((exp.exp * 1000) < (new Date()).getTime()){
    localStorage.removeItem('token')
    history.push('/login')
  }else{
    console.log('greater')
  }

  
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
          <AuthGuard path="/folder/:id" component={Folder} />
          <Route path="/login" component={Login} />
          <AuthGuard path="/recent" component={Recent} />
          <AuthGuard path="/shared" component={Shared} />
          <Route path="/signup" component={Signup} />
          <AuthGuard path="/starred" component={Starred} />
          <AuthGuard path="/trash" component={Trash} />
       
      </Switch>
      </>
    )
      
     
   
})
function App() {
  
  return (
    <FileProvider>
    <div className="wrapper">
    <BrowserRouter>
    <Main />
  </BrowserRouter>
  </div>
  </FileProvider>
  );
}

export default App;
