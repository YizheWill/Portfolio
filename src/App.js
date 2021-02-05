import './App.css';
import Carousel from './components/Carousel';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Landing';
function Routes() {
  console.log('here');
  return (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route path='/works'>
        <Carousel />
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes />
      </Router>
    </div>
  );
}

export default App;
