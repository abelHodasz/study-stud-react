import React from "react";
import "./File.css";
import { Card, Button } from "@material-ui/core";
import { saveAs } from "file-saver";
import Axios from "axios";
import axios, { baseURL } from "../../axios/axios";
import DeleteIcon from "@material-ui/icons/Delete";

export default function File(props) {
    const download = () => {
        let instance = Axios.create({
            baseURL: baseURL,
            responseType: "blob",
        });
        instance.get(`files/${props.id}`).then((response) => {
            let url = window.URL.createObjectURL(new Blob([response.data]));
            saveAs(url, props.title);
        });
    };

    const deleteFile = () => {
        axios.delete(`/files/${props.id}`).then((resp) => {
            if (resp.status !== 200) {
                console.log("Something went wrong");
            }
            props.setDelete(true);
        });
    };

    return (
        <Card className="file">
            <h4 className="file-title">{props.title}</h4>
            <Button
                id="downloadBtn"
                variant="contained"
                color="primary"
                onClick={download}
            >
                Download
            </Button>
            <Button
                id="fileDeleteBtn"
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={deleteFile}
            >
                Delete
            </Button>
        </Card>
    );
}
