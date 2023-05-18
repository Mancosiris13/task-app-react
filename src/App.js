import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Routes,
} from 'react-router-dom';
import LogIn from './components/LogIn';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import SignUp from './components/SignUp';
import LogOut from './components/LogOut';
import Settings from './components/Settings';
import DeletedAccount from './components/DeletedAccount';
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/users/login" element={<LogIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/deletedAccount" element={<DeletedAccount />} />
      </Routes>
    </Router>
  );
}

export default App;
