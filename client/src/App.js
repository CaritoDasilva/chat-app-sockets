import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import Login from './views/Login';
import { AuthProvider } from './contexts/AuthContext';
import { SocketProvider } from './contexts/SocketContext';
import { ChatProvider } from './contexts/ChatContext';
import Home from './views/Home';
import { MycontextProvider } from './contexts/MyContext';

function App() {
  return (
    <MycontextProvider>
      <ChatProvider>
        <AuthProvider>
          <SocketProvider>        
            <Router>
              <div className="App">
              <Switch>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/home">
                  <Home />
                </Route>
                {/* <Route path="/users">
                  <Users />
                </Route>
                */} 
              </Switch>
              </div>
            </Router>
          </SocketProvider>
        </AuthProvider>
      </ChatProvider>
      
    </MycontextProvider>
  );
}

export default App;
