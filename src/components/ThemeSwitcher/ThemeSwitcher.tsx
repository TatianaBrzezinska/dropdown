import { useEffect, useState, useRef } from 'react';
import {
  applyScheme,
  getSystemScheme,
  getSavedScheme,
  removeSavedScheme,
} from '../../utils/colorSchemeUtils';
import { Dropdown } from '../Dropdown/Dropdown';
import { Auto, Check, Moon, Sun } from '../Icons';
import './ThemeSwitcher.css';

type ThemeOption = 'auto' | 'dark' | 'light';

const systemPreferenceMatcher = window.matchMedia('(prefers-color-scheme:dark)');

const SchemeIcon = ({ currentScheme }: { currentScheme: ThemeOption }) => {
  switch (currentScheme) {
    case 'auto':
      return <Auto />;
    case 'dark':
      return <Moon />;
    case 'light':
    default:
      return <Sun />;
  }
};

const ThemeOptionButton = ({
  scheme,
  activeScheme,
  onSchemeChange,
}: {
  scheme: ThemeOption;
  activeScheme: ThemeOption;
  onSchemeChange: (scheme: ThemeOption) => void;
}) => (
  <button className="theme-switcher__option" onClick={() => onSchemeChange(scheme)}>
    <SchemeIcon currentScheme={scheme} />
    <span className="theme-switcher__text">{scheme.charAt(0).toUpperCase() + scheme.slice(1)}</span>
    {activeScheme === scheme && (
      <div className="theme-switcher__check">
        <Check />
      </div>
    )}
  </button>
);

export const ThemeSwitcher = () => {
  const [isDropdownVisible, setDropdownVisibility] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState<ThemeOption>(getSavedScheme() || 'auto');
  const targetRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (selectedScheme === 'auto') {
      removeSavedScheme();
      applyScheme(getSystemScheme());
    } else {
      applyScheme(selectedScheme, true);
    }
  }, [selectedScheme]);

  useEffect(() => {
    const handleSystemSchemeChange = () => {
      if (selectedScheme === 'auto') {
        applyScheme(getSystemScheme());
      }
    };

    systemPreferenceMatcher.addEventListener('change', handleSystemSchemeChange);
    return () => {
      systemPreferenceMatcher.removeEventListener('change', handleSystemSchemeChange);
    };
  }, [selectedScheme]);

  return (
    <div className="theme-switcher">
      <button
        className="theme-switcher__value"
        ref={targetRef}
        onClick={(e) => {
          e.stopPropagation();
          setDropdownVisibility(!isDropdownVisible);
        }}
      >
        <SchemeIcon currentScheme={selectedScheme} />
      </button>
      <Dropdown
        shown={isDropdownVisible}
        onShownChange={setDropdownVisibility}
        targetRef={targetRef}
      >
        {['auto', 'dark', 'light'].map((scheme) => (
          <ThemeOptionButton
            key={scheme}
            scheme={scheme as ThemeOption}
            activeScheme={selectedScheme}
            onSchemeChange={setSelectedScheme}
          />
        ))}
      </Dropdown>
    </div>
  );
};
