import React, {useRef, useState} from "react";
import './DiseasePage.css';
import axios from "axios";

const DiseasePage = (props) => {
    const [files, setFiles] = useState("empty.txt");
    
    const hiddenFileInput = useRef(null);
    
    const uploadPicker = (event) => {
        event.preventDefault();
        hiddenFileInput.current.click();
    }
    /*
    const uploadHandler = (event) => {
        const file = event.target.files[0];
        setFiles(file);
    }

    const removeFile = (filename) => {
        setFiles(files.filter(file => file.name !== filename))
    }
    const submitDisease = (event) => {
        event.preventDefault();
        //axios.post('http://localhost:8080/penyakit/add')
    }*/
    return (
        <div className='diseasePage'>
            <div className='diseaseTitle'>
                <h1>Tambahkan Penyakit</h1>
            </div>
            <div className='diseaseBody'>
                <div className='diseaseForm'>
                    <form method="post">
                        <table>
                            <tr>
                                <td>
                                    <label for="diseaseNameInput">
                                        Nama Pengguna:
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
                                    <input type="text" name="diseaseNameInput" placeholder="<pengguna>" />
                                </td>
                                <td>
                                    <button onClick={uploadPicker}>upload file...</button>
                                    <input type='file' ref={hiddenFileInput} name="diseaseFileInput" id="diseaseGetFile" style={{display: 'none'}} /*onChange={uploadHandler}*/ />
                                    <label>{props.fileNameDisease}</label>
                                </td>
                            </tr>
                        </table>
                        <input type="submit" value="Submit" /*onClick={submitDisease}*//>
                    </form>
                </div>
            </div>

        </div>
    )

}

export default DiseasePage