import { NavLink } from "react-router-dom";
import "./Navbar.css";

function linkClassName({ isActive }) {
  return isActive ? "navLink navLinkActive" : "navLink";
}

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" end className={linkClassName}>
        Home
      </NavLink>
      <NavLink to="/profile" className={linkClassName}>
        Profile
      </NavLink>
    </nav>
  );
}