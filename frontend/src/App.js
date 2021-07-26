import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Header from './pages/Header'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route>
            <Header />
          </Route>
        </Switch>
      </div>
    </Router>  
  );
}

export default App;
