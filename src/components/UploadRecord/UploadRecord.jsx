import { useState } from "react";
import axios from "axios";

const UploadRecord = () => {
    const [file, setFile] = useState(null);
    const [uploadedFileUrl, setUploadedFileUrl] = useState("");
    const [recordName, setRecordName] = useState("");
    const [description, setDescription] = useState("");

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === "application/pdf") {
            setFile(selectedFile);
        } else {
            alert("Only PDF files are allowed.");
            setFile(null);
        }
    };

    const handleRecordName = (e) => {
        setRecordName(e.target.value);
    };

    const handleDescription = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", recordName);
        formData.append("description", description);

        try {
            //const response = await axios.post('http://your-server-url/upload', formData);
            //setUploadedFileUrl(response.data.fileUrl);
            alert("File and data uploaded successfully");
        } catch (error) {
            console.error("Error uploading file and data:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>File:</label>
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                />
            </div>
            <div>
                <label>Record Name:</label>
                <input
                    type="text"
                    value={recordName}
                    onChange={handleRecordName}
                    placeholder="Record Name"
                    maxLength={100}
                    required
                />
            </div>
            <div>
                <label>Description</label>
                <textarea
                    type="text"
                    value={description}
                    onChange={handleDescription}
                    placeholder="Additional details"
                ></textarea>
            </div>
            <button type="submit">Upload Record</button>
        </form>
    );
};

export default UploadRecord;
