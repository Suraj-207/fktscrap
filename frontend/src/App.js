import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./pages/Header";
import Review from "./pages/Review";
import Products from './pages/Products';
import {Context} from "./Context/context";

function App() {
  return (
    <Router>
      <div className="App">
        <Context.Provider
        value={{
          review: []
        }}>
          <Switch>
            <Route path="/" exact>
              <Header />
            </Route>
            <Route path="/products" exact >
              <Header />
              <Products />
            </Route>
            <Route path="/review" exact>
              <Header />
              <Review />
            </Route>
          </Switch>
        </Context.Provider>
      </div>
    </Router>
  );
}

export default App;
