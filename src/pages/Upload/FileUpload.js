import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import axios from "../../axios/axios";

export default function FileUpload(props) {
    const [file, setFile] = useState(null);
    const { id } = useParams();

    const upload = () => {
        const data = new FormData();
        data.append("file", file);
        axios
            .post("/files", {
                TopicId: id,
                FormFile: data
            })
            .then(res => console.log(res));
    };

    return (
        <div className="container">
            <div className="row">
                <div className="offset-md-3 col-md-6">
                    <div className="form-group files">
                        <label>Upload Your File </label>
                        <input
                            type="file"
                            className="form-control"
                            name="file"
                            onChange={event => setFile(event.target.files[0])}
                        />
                    </div>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={upload}
                    >
                        Upload
                    </Button>
                </div>
            </div>
        </div>
    );
}