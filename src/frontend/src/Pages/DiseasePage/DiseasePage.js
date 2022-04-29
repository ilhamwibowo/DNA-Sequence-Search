import React, { useState} from "react";
import './DiseasePage.css';

const DiseasePage = (props) => {
    const [diseaseName, setDiseaseName] = useState('');
    const [files, setFiles] = useState(null);

    const uploadHandler = (event) => {
        const file = event.target.files[0];
        setFiles(file);
    }

    const submitDisease = (event) => {
        // console.log(diseaseName);
        // alert(diseaseName);
        var file = files;
        var textType = /text.*/;
        if (file.type.match(textType)) {
            var reader = new FileReader();
            reader.onload = function(e) {
                var content = reader.result;
                let data = {
                    Nama_Penyakit:diseaseName,
                    DNASequence:content
                };
                fetch('http://localhost:8080/penyakit/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                  }).then(function(response) {
                    console.log(response)
                    return response.json();
                  });
                alert("Success!");
            }
    
            reader.readAsText(file);    
        }

    }
    return (
        <div className='diseasePage'>
            <div className='diseaseTitle'>
                <h1>Tambahkan Penyakit</h1>
            </div>
            <div className='diseaseBody'>
                <div className='diseaseForm'>
                    <form onSubmit={submitDisease}>
                        <table>
                            <tr>
                                <td>
                                    <label for="diseaseNameInput">
                                        Nama Penyakit:
                                    </label>
                                </td>
                                <td>
                                    <label for="diseaseFileInput">
                                        Sequence DNA:
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input 
                                        type="text" 
                                        name="diseaseNameInput" 
                                        placeholder="<pengguna>"
                                        value={ diseaseName } 
                                        onChange={(e) => setDiseaseName(e.target.value)}
                                    />
                                </td>
                                <td>
                                    {/* <button onClick={uploadPicker}>upload file...</button> */}
                                    <input 
                                        type='file' 
                                        name="diseaseFileInput" 
                                        onChange={uploadHandler}
                                    />
                                    {/* <label>{props.fileNameDisease}</label> */}
                                </td>
                            </tr>
                        </table>
                        <button type="submit" >Submit</button>
                    </form>
                </div>
            </div>

        </div>
    )

}

export default DiseasePage