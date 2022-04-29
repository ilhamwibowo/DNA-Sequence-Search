import React, {useRef, useState} from "react";
import './DNAPage.css';

const DNAPage = (props) => {
    const [files, setFiles] = useState("empty.txt");

    const hiddenFileInput = useRef(null);

    const uploadPicker = (event) => {
        event.preventDefault();
        hiddenFileInput.current.click();
    }
    const uploadHandler = (event) => {
        const file = event.target.files[0];
        setFiles(file);
        //setResultLabel(files);
    }

    return (
        <div className='dnaPage'>
            <div className='dnaTitle'>
                <h1>Tes DNA</h1>
            </div>
            <div className='dnaBody'>
                <div className='dnaForm'>
                    <form method="post">
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
                                    <input type="text" name="dnaUsernameInput" placeholder="<pengguna>" />
                                </td>
                                <td>
                                    <button onClick={uploadPicker}>upload file...</button>
                                    <input type='file' ref={hiddenFileInput} name="dnaFileInput" id="getFile" style={{display: 'none'}} onChange={uploadHandler} />
                                    <label>{props.fileNameDNA}</label>
                                </td>
                                <td>
                                    <input type="text" name="dnaDiseaseInput" placeholder="<penyakit>" />
                                </td>
                            </tr>
                        </table>
                        <input type="submit" value="Submit" onClick={uploadHandler}/>
                    </form>
                </div>
                <div className='dnaResult'>

                </div>
            </div>
        </div>
    )

}

export default DNAPage