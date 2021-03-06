
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Landing from './components/layout/Landing';
import Auth from './views/Auth'
import AuthContextProvider from './contexts/AuthContext'
import Dashboard from './views/Dashboard';
import ProtectedRoute from './components/routing/ProtectedRoute';
import About from './views/About';
import PostContextProvider from './contexts/PostContext';
function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <Router>
          <Switch>
            <Route exact path='/' component={Landing}/>
            <Route exact path='/signin' render={props => <Auth {...props} authRoute='signin' />}/>
            <Route exact path='/signup' render={props => <Auth {...props} authRoute='signup' />}/>
            <ProtectedRoute  exact path='/dashboard' component={Dashboard}/>
            <ProtectedRoute  exact path='/about' component={About}/>

          </Switch>
        </Router>
      </PostContextProvider>
    </AuthContextProvider>
    
  );
}

export default App;
