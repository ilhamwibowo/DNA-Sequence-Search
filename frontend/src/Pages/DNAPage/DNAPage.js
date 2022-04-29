import React, {useState} from "react";
import './DNAPage.css';

const DNAPage = (props) => {
    const [files, setFiles] = useState(null);
    const [name, setName] = useState('');
    const [disease, setDisease] = useState('');
    const [result, setResult] = useState([]);
    const [pred, setPred] = useState('');
    const uploadHandler = (event) => {
        const file = event.target.files[0];
        setFiles(file);
    }

    const submitData =  (event) => {
        event.preventDefault();
        var file = files;
        var textType = /text.*/;
        if (file.type.match(textType)) {
            var reader = new FileReader();
            reader.onload = async function (e) {
                var content = reader.result;
                let data = {
                    Nama : name,
                    Nama_Penyakit : disease,
                    DNASequence : content
                };
                let response = await fetch('http://localhost:8080/hasil/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                  }).then((response) => response.json())
                  .then((date) => {
                      setResult(date.currentdate);
                      setPred(date.pred);
                      return date;
                  });
                alert("Success!");
            }
    
            reader.readAsText(file);    
        }
    }
    return (
        <div className='dnaPage'>
            <div className='dnaTitle'>
                <h1>Tes DNA</h1>
            </div>
            <div className='dnaBody'>
                <div className='dnaForm'>
                    <form onSubmit={submitData}>
                        <table>
                            <tr>
                                <td>
                                    <label for="dnaUsernameInput">
                                        Nama Pengguna:
                                    </label>
                                </td>
                                <td>
                                    <label for="dnaFileInput">
                                        Sequence DNA:
                                    </label>
                                </td>
                                <td>
                                    <label for="dnaDiseaseInput">
                                        Prediksi Penyakit:
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input 
                                        type="text" 
                                        name="dnaUsernameInput" 
                                        placeholder="<pengguna>" 
                                        value= {name}
                                        onChange={(e) => setName(e.target.value)}

                                    />
                                </td>
                                <td>
                                    {/* <button onClick={uploadPicker}>upload file...</button> */}
                                    <input 
                                        type='file' 
                                        name="dnaFileInput" 
                                        id="getFile" 
                                        onChange={uploadHandler} 
                                    />
                                    {/* <label>{props.fileNameDNA}</label> */}
                                </td>
                                <td>
                                    <input 
                                        type="text" 
                                        name="dnaDiseaseInput" 
                                        placeholder="<penyakit>" 
                                        value= {disease}
                                        onChange={(e) => setDisease(e.target.value)}
                                    />
                                </td>
                            </tr>
                        </table>
                        <button type="submit" >Submit</button>
                    </form>
                </div>
                <div className='dnaResult'>
                    Result : {result} - {name} - {disease} - {pred}
                </div>
            </div>
        </div>
    )

}

export default DNAPage