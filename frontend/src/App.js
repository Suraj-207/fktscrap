import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./pages/Header";
import Review from "./pages/Review";
import Products from "./pages/Products";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route path="/" exact>
              <Welcome />
            </Route>
            <Route path="/products" exact>
              <Products />
            </Route>
            <Route path="/review" exact>
              <Review />
            </Route>
          </Switch>
        </div>
    </Router>
  );
}

export default App;
