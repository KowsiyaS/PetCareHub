import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UploadRecord = ({ token }) => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [uploadedFileUrl, setUploadedFileUrl] = useState("");
    const [selectedPet, setSelectedPet] = useState(null);
    const [petList, setPetList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate("");

    const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

    const getPets = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/pet`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);
            const tempList = response.data.map((pet) => ({
                value: pet.id,
                name: pet.name,
            }));
            setPetList(tempList);
            setSelectedPet(tempList[0]);
            setIsLoaded(true);
        } catch (error) {
            console.error("Error fetching pets:", error);
        }
    };

    useEffect(() => {
        getPets();
    }, []);

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
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    return isLoaded ? (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="pet-select">Select a pet:</label>
                    <select
                        id="pet-select"
                        value={selectedPet}
                        onChange={(e) => setSelectedPet(e.target.value)}
                    >
                        {petList.map((pet) => (
                            <option key={pet.value} value={pet.value}>
                                {pet.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="file">PDF File:</label>
                    <input
                        id="file"
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit">Upload</button>
            </form>

            {uploadedFileUrl && (
                <div>
                    <h3>Uploaded File:</h3>
                    <embed
                        src={uploadedFileUrl}
                        type="application/pdf"
                        width="600"
                        height="800"
                    />
                </div>
            )}
        </div>
    ) : (
        <div>Loading...</div>
    );
};

export default UploadRecord;
