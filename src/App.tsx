import logo from "./logo.svg";
import "./App.css";
import { DropdownThemeSwitcher } from "./components/DropdownThemeSwitcher/DropdownThemeSwitcher";
import {
  applyScheme,
  getSavedScheme,
  getSystemScheme,
} from "./colorSchemeUtils";

applyScheme(getSavedScheme() || getSystemScheme());

function App() {
  return (
    <div className="app">
      <div className="app__dropdown-wrapper">
        <DropdownThemeSwitcher />
      </div>
      <header className="app__header">
        <img src={logo} className="app__logo" alt="logo" />
        <p>Demo</p>
      </header>
    </div>
  );
}

export default App;
