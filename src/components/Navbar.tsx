import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav style={{ padding: "10px", background: "#333", color: "white" }}>
      <ul style={{ display: "flex", gap: "20px", listStyle: "none" }}>
        <li>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            Startsida
          </Link>
        </li>
        <li>
          <Link
            to="/booking"
            style={{ color: "white", textDecoration: "none" }}
          >
            Bokning
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            style={{ color: "white", textDecoration: "none" }}
          >
            Kontakt
          </Link>
        </li>
        <li>
          <Link to="/admin" style={{ color: "white", textDecoration: "none" }}>
            Admin
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
