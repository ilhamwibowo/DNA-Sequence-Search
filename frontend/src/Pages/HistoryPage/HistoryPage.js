import './HistoryPage.css';
import React, {useEffect, useState} from "react";
import axios from 'axios';
const HistoryPage = () => {
    const [query, setQuery] = useState('');
    const [rengsult, setRengsult] = useState([]);
    
    // useEffect(() => {
    //     getResultData();
    // },[]);

    // const getResultData = async () => {
    //     const response = await fetch("http://localhost:8080/search");
    //     setRengsult(response.data);
    // }
    
    const submit =  (event) => {
        event.preventDefault();
        //do something
        alert("hoe");
        let response =  fetch('http://localhost:8080/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({query:query})
          }).then((response) => response.json())
          .then((date) => {
              setRengsult(date);

              return date;
          });
        // let response = await axios.post('http://localhost:8080/search',{
        //     query:query
        // }).then(function(response) {
        //     alert(response[0].Nama_Penyakit);
        //     return response;
        // })

        alert(response);
        alert("slfjas;ldfkjasl;jfasl;kjfl;kasdjfl;asj");
    }

    return (
        <div className='historyPage'>
            <div className='historyTitle'>
                <h1>Search</h1>
            </div>
            <div className='historyBody'>
                <div className='historyForm'>
                    <form onSubmit={submit}>
                        <table>
                            <tr>
                                <td>
                                    <label for="queryInput">
                                        Query Pencarian :
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input 
                                        type="text" 
                                        name="queryInput" 
                                        placeholder="<Search>" 
                                        value= {query}
                                        onChange={(e) => setQuery(e.target.value)}

                                    />
                                </td>
                            </tr>
                        </table>
                        <button type="submit" >Submit</button>
                    </form>
                </div>
                <table className="table table-striped"> 
                    <thead>
                        <tr>
                            <th>Tanggal</th>
                            <th>Nama</th>
                            <th>Prediksi</th>
                            <th>Hasil</th>
                        </tr>
                    </thead>
                    <tbody>
                        { rengsult.map((result) => (
                            <tr>
                                <td>{result.Tanggal}</td>
                                <td>{result.Nama}</td>
                                <td>{result.Nama_Penyakit}</td>
                                <td>{result.Prediksi}</td>
                            </tr>
                        )) }
                    </tbody>
                </table>
            </div>

        </div>
    )

}

export default HistoryPage