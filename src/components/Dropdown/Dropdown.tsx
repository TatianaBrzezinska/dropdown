import "./Dropdown.css";

interface DropdownProps {
  onClick?: VoidFunction;
}

export const Dropdown = ({ onClick }: DropdownProps) => {
  return <div onClick={onClick}>Dropdown</div>;
};
