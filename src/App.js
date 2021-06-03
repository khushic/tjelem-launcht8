import './App.css';
import Calendar from "./Events/Calendar"
import Sidebar from "./Dashboard/Sidebar"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React,{Fragment} from 'react';
function App() {
  return (
    <div className="App">
      <Router>
      <Sidebar></Sidebar>
        <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/AllClasses"  />
        <Route path="/ClassPage"  />
        <Route path="/StudentDirectory"  />
        <Route path="/TeacherDirectory"  />
        <Route path="/Calendar"  component={Calendar} />
       </Switch>
      </Router>
    </div>
  );
}
const Home = () => (
  <Fragment>
    <h1>Welcome!</h1>
  </Fragment>
  );

export default App;
