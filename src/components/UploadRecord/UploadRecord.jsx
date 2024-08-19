import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./UploadRecord.scss";

const UploadRecord = ({ token }) => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [uploadedFileUrl, setUploadedFileUrl] = useState("");
    const [selectedPet, setSelectedPet] = useState(null);
    const [petList, setPetList] = useState([]);
    const [viewMode, setViewMode] = useState(false);
    const [record, setRecord] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

    const getPets = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/pet`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const tempList = response.data.map((pet) => ({
                value: pet.id,
                name: pet.name,
            }));
            setPetList(tempList);
            setSelectedPet(tempList[0]);
        } catch (error) {
            console.error("Error fetching pets:", error);
        }
    };

    useEffect(() => {
        getPets();
        if (location.state?.record) {
            const tempRecord = location.state.record;
            setRecord(tempRecord);
            setViewMode(true);
        } else {
            setViewMode(false);
        }
    }, [location.state]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === "application/pdf") {
            setFile(selectedFile);
        } else {
            alert("Only PDF files are allowed.");
            setFile(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", title);
        formData.append("description", description);
        console.log(selectedPet);
        formData.append("pet_id", selectedPet.value);

        try {
            const response = await axios.post(
                `${API_BASE_URL}/medical-record/upload`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setUploadedFileUrl(response.data.fileUrl);
            alert("File uploaded successfully");
            navigate("/profile");
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    return (
        <div className="upload-record">
            {viewMode ? (
                <div className="upload-record__view">
                    <h1>Record Details</h1>
                    <div className="upload-record__field">
                        <p className="upload-record__label">Title:</p>
                        <p className="upload-record__value">{record?.name}</p>
                    </div>
                    <div className="upload-record__field">
                        <p className="upload-record__label">Description:</p>
                        <p className="upload-record__value">
                            {record?.description}
                        </p>
                    </div>
                    <div className="upload-record__preview">
                        <h3 className="upload-record__preview-title">
                            Uploaded File:
                        </h3>
                        {record?.url && (
                            <embed
                                src={record.url}
                                type="application/pdf"
                                width="600"
                                height="800"
                                className="upload-record__pdf-viewer"
                            />
                        )}
                    </div>
                </div>
            ) : (
                <div>
                    <h1>Upload a Record</h1>
                    <form
                        onSubmit={handleSubmit}
                        className="upload-record__form"
                    >
                        <div className="upload-record__field">
                            <label
                                htmlFor="pet-select"
                                className="upload-record__label"
                            >
                                Select a pet:
                            </label>
                            <select
                                id="pet-select"
                                value={selectedPet?.value || ""}
                                onChange={(e) => {
                                    const selectedValue = e.target.value;
                                    console.log(petList);
                                    const selected = petList.find(
                                        (pet) => pet.value == selectedValue
                                    );
                                    console.log(selected);
                                    setSelectedPet(selected || null);
                                }}
                                className="upload-record__select"
                            >
                                {petList.map((pet) => (
                                    <option key={pet.value} value={pet.value}>
                                        {pet.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="upload-record__field">
                            <label
                                htmlFor="title"
                                className="upload-record__label"
                            >
                                Title:
                            </label>
                            <input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="upload-record__input"
                                required
                            />
                        </div>
                        <div className="upload-record__field">
                            <label
                                htmlFor="description"
                                className="upload-record__label"
                            >
                                Description:
                            </label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="upload-record__textarea"
                            />
                        </div>
                        <div className="upload-record__field">
                            <label
                                htmlFor="file"
                                className="upload-record__label"
                            >
                                PDF File:
                            </label>
                            <input
                                id="file"
                                type="file"
                                accept="application/pdf"
                                onChange={handleFileChange}
                                className="upload-record__file-input"
                            />
                        </div>
                        <button type="submit" className="upload-record__button">
                            Upload
                        </button>
                    </form>

                    {uploadedFileUrl && (
                        <div className="upload-record__preview">
                            <h3 className="upload-record__preview-title">
                                Uploaded File:
                            </h3>
                            <embed
                                src={uploadedFileUrl}
                                type="application/pdf"
                                width="600"
                                height="800"
                                className="upload-record__pdf-viewer"
                                title="PDF Viewer"
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default UploadRecord;
