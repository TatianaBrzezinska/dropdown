import { applyScheme, getSavedScheme, getSystemScheme } from '../../utils';
import { ThemeSwitcher } from '../index';
import logo from '../../images/logo.svg';
import './App.css';

applyScheme(getSavedScheme() || getSystemScheme());

export const App = () => {
  return (
    <div className="app">
      <div className="app__dropdown-wrapper">
        <ThemeSwitcher />
      </div>
      <header className="app__header">
        <img src={logo} className="app__logo" alt="logo" />
        <p>Demo</p>
      </header>
    </div>
  );
};
