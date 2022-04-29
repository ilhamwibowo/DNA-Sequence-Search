import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import DiseasePage from './Pages/DiseasePage/DiseasePage';
import ResultLabel from './Pages/DiseasePage/ResultLabel';
import DNAPage from './Pages/DNAPage/DNAPage';

function App() {
  const [data,setData] = React.useState(null);
  const [fileNameDisease, setFileNameDisease] = React.useState("No File Chosen");
  const [fileNameDNA, setFileNameDNA] = React.useState("No File Chosen");
  React.useEffect(() => {
    fetch("/show")
    .then(res => res.json())
    .then((data) => setData(data));
  }, [])

  return (
    <Router>
      <div className="App">
        {/*<Navbar />*/}
        {/*<DiseasePage fileNameDisease={fileNameDisease}/>*/}
        <DNAPage fileNameDNA={fileNameDNA}/>
        {/*<ResultLabel file={resultLabel}/>*/}
        <div className="content">
            <p>{data}</p>
        </div>
      </div>
    </Router>
  );
}



export default App;