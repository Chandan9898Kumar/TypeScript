import { NavLink } from "react-router-dom";

const NavigationCounter = () => {
  return (
    <div className="navigation-counter">
      <NavLink to="/">Counter page</NavLink>
      <NavLink to="account">Account page</NavLink>
      <NavLink to="contact">Contact page</NavLink>
    </div>
  );
};

export default NavigationCounter;
