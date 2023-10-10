import logo from "./logo.svg";
import "./App.css";
import { Dropdown } from "./components/Dropdown/Dropdown";

function App() {
  return (
    <div className="App">
      <div className="dropdown__wrapper">
        <Dropdown />
      </div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
