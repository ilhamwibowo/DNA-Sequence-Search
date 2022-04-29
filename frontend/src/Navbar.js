import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <table className='topTable'>
          <td className="leftCell"><Link to="/">Check DNA Sequence</Link></td>
          <td className="middleCell"><Link to="/history">Search</Link></td>
          <td className="rightCell"><Link to="/disease">Add DNA Sequence</Link></td>
      </table>
    </div>
  );
}

export default Navbar;