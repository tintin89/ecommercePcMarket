
import MyCart from './pages/MyCart';
import Dashboard from './pages/Dashboard';
import Recovery from './pages/Recovery';
import Home from './pages/Home';
import Search from './pages/Search';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import ProductView from './pages/ProductView';
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import WithAuth from './hoc/withAuth';
import WithAdminAuth from './hoc/WithAdminAuth';
import {checkUserSession} from './redux/User/user.actions';


function App(props) {
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(checkUserSession());
  },[dispatch])

  return (
    <BrowserRouter>
    <Switch>
    <Route path="/cart" render={()=>(
      <MyCart/>     
    )}/>
    <Route path="/admin/:filterType" render={()=>(
      <WithAdminAuth>
        <Admin/>
      </WithAdminAuth>
       )}/>

    <Route path="/admin" render={()=>(
      <WithAdminAuth>
        <Admin/>
      </WithAdminAuth>
           
    )}/>
    <Route path="/dashboard" render={()=>(
      <WithAuth>
        <Dashboard/>
      </WithAuth>     
    )}/>
    <Route path="/recuperar" render={()=>(
      <Recovery/>     
    )}/>
    <Route path="/registro" render={()=>(
      <Register/>     
    )}/>
    <Route path="/entrar" render={()=>(
      <Login/>     
    )}/>
    <Route path="/producto/:productId" render={()=>(      
        <ProductView/>      
    )}/>  
     <Route path="/buscar/:filterType" render={()=>(      
        <Search/>      
    )}/>  
    <Route path="/buscar" render={()=>(
      <Search/>     
    )}/>
    <Route exact path="/" render={()=>(
      <Home/>          
    )}/>
    </Switch>
    </BrowserRouter>
  )
   
  
}

export default App;
