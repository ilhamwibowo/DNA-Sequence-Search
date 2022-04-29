import Navbar from "./Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import DiseasePage from './Pages/DiseasePage/DiseasePage';
import ResultLabel from './Pages/DiseasePage/ResultLabel';
import DNAPage from './Pages/DNAPage/DNAPage';
import HistoryPage from "./Pages/HistoryPage/HistoryPage.js"
function App() {
  // const [data,setData] = React.useState(null);
  // const [fileNameDisease, setFileNameDisease] = React.useState([]);
  // const [fileNameDNA, setFileNameDNA] = React.useState([]);

  return (
    <Router>
      <div className="App">
        <Navbar />
        {/*<DiseasePage fileNameDisease={fileNameDisease}/>*/}
        {/*<ResultLabel file={resultLabel}/>*/}
        <div className="content">
          <Routes>
            <Route path="/test" element={<DNAPage/>}/>
            <Route path="/disease" element={<DiseasePage/>}/>
            <Route path="/history" element={<HistoryPage/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}



export default App;