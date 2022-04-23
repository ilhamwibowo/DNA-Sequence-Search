import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";

function App() {
  const [data,setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/show")
    .then(res => res.json())
    .then((data) => setData(data));
  }, [])

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
            <p>{data}</p>
        </div>
      </div>
    </Router>
  );
}

export default App;