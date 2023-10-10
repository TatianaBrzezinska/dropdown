import { useEffect, useState } from "react";
import cx from "classnames";
import {
  applyScheme,
  getSystemScheme,
  getSavedScheme,
  removeSavedScheme,
} from "../../colorSchemeUtils";
import "./DropdownThemeSwitcher.css";

type ColorSchemeSwitcherValues = "auto" | "dark" | "light";

const matchMedia = window.matchMedia("(prefers-color-scheme:dark)");

interface DropdownThemeSwitcherProps {
  className?: string;
  onClick?: VoidFunction;
}

export const DropdownThemeSwitcher = ({
  onClick,
  className,
}: DropdownThemeSwitcherProps) => {
  const [userScheme, setUserScheme] = useState<ColorSchemeSwitcherValues>(
    getSavedScheme() || "auto"
  );

  useEffect(() => {
    if (userScheme === "auto") {
      removeSavedScheme();
      applyScheme(getSystemScheme());
    } else {
      applyScheme(userScheme, true);
    }
  }, [userScheme]);

  useEffect(() => {
    const systemColorSchemeListener = () => {
      if (userScheme === "auto") {
        applyScheme(getSystemScheme());
      }
    };

    matchMedia.addEventListener("change", systemColorSchemeListener);
    return () => {
      matchMedia.removeEventListener("change", systemColorSchemeListener);
    };
  }, [userScheme]);

  return (
    <div>
      <select
        className={cx("dropdown", className)}
        onChange={(e) =>
          setUserScheme(e.target.value as ColorSchemeSwitcherValues)
        }
        value={userScheme}
      >
        <option value="auto">Auto</option>
        <option value="dark">Dark</option>
        <option value="light">Ligth</option>
      </select>
    </div>
  );
};
