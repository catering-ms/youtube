import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import NewMenu from "./pages/newMenu/NewMenu";
import MenuDetail from "./pages/menuDetail/MenuDetail";
import IngredList from "./pages/ingredList/IngredList";
import NewIngred from "./pages/newIngred/NewIngred";
import IngredDetail from "./pages/ingredDetail/IngredDetail"


function App() {
  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
          
          <Route path="/newIngred">
            <NewIngred />
          </Route>

          <Route path="/ingreds">
            <IngredList />
          </Route>



          <Route path="/user/:userId">
            <User />
          </Route>
          <Route path="/newUser">
            <NewUser />
          </Route>
          <Route path="/products">
            <ProductList />
          </Route>
          <Route path="/product/:productId">
            <Product />
          </Route>
          <Route path="/menuDetail/:productId" render={(props) => (
            <MenuDetail menuId={props.match.params.productId}/>
          )}>
          </Route>
          <Route path="/ingredDetail/:productId" render={(props) => (
            <IngredDetail menuId={props.match.params.productId}/>
          )}>

          </Route>
          <Route path="/newproduct">
            <NewProduct />
          </Route>
          <Route path="/newmenu">
            <NewMenu />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
