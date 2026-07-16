import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

function linkClassName({ isActive }) {
  return isActive ? "navLink navLinkActive" : "navLink";
}

export default function Navbar() {
  const { session, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {session && (
        <>
          <NavLink to="/" end className={linkClassName}>
            Home
          </NavLink>
          <NavLink to="/profile" className={linkClassName}>
            Profile
          </NavLink>
        </>
      )}
      <div className="navbarSpacer" />
      {session ? (
        <Button variant="subtle" size="xs" onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <NavLink to="/login" className={linkClassName}>
          Login
        </NavLink>
      )}
    </nav>
  );
}
