import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo-container">
        <p className="logo" style = {{color:"white"}}>DNA Sequence Checker</p>
      </div>
      <ul>
        {/* <li>The Secure Generator</li> */}
        <li><Link to="/test">Check DNA Sequence</Link></li>
        <li><Link to="/history">Search</Link></li>
        <li><Link to="/disease">Add DNA Sequence</Link></li>
      </ul>
    </div>
  );
}

export default Navbar;