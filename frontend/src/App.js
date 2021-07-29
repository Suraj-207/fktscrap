import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./pages/Header";
import Review from "./pages/Review";
import Products from './pages/Products';
import Welcome from "./pages/Welcome";

function App() {
  return (
    <Router>
      <div className="App">
          <Switch>
            <Route path="/" exact>
              <Header />
              <Welcome />
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
      </div>
    </Router>
  );
}

export default App;
