import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import React from 'react';
import Success from "./pages/Success"



import {
  BrowserRouter as Router ,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const user=useSelector((state)=>state.user.currentUser);
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/products/:category" component={ProductList}/>
        <Route path="/product/:id" component={Product}/>
        <Route path="/cart" component={Cart}/>
        <Route path="/login" component={Login}>
        {user? <Redirect to="/"/> :<Login/>}
        </Route>
        <Route path="/register">
        {user? <Redirect to="/"/> :<Register/>}
        </Route>
        <Route path="/success" component={Success} />
      </Switch>
    </Router>
  );
}

export default App;
