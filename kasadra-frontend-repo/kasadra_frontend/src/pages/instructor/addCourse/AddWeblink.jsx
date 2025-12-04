import React, { useState, useEffect } from "react";
import "../../../styles/instructor/addCourse/AddWeblink.css";
import Instructornavbar from "../../../components/Instructornavbar";
import BackButton from "../../../components/BackButton";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    uploadWeblink,
    resetWeblinkState,
} from "../../../features/instructor/addCourse/addWeblinkSlice";

const AddWeblink = () => {
    const [link, setLink] = useState("");
    const { courseId, lessonId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, success, error, successMessage, errorMessage } = useSelector(
        (state) => state.weblink
    );

    // URL VALIDATION FUNCTION
    const validateURL = (url) => {
        const pattern = new RegExp(
            "^(https?:\\/\\/)" + // must start with http or https
            "(([a-zA-Z0-9]+(-?[a-zA-Z0-9])*)\\.)+" + // domain
            "[a-zA-Z]{2,}" + // extension
            "(\\/.*)?$", // optional path
            "i"
        );

        return pattern.test(url);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const trimmedLink = link.trim();

        // Empty check
        if (!trimmedLink) {
            alert("Please enter a link");
            return;
        }

        // URL format validation
        if (!validateURL(trimmedLink)) {
            alert("Please enter a valid URL");
            return;
        }

        // Additional security (avoid javascript: URLs)
        if (trimmedLink.startsWith("javascript:")) {
            alert("Invalid URL format");
            return;
        }

        const formData = new FormData();
        formData.append("link_url", trimmedLink);
        formData.append("course_id", courseId);
        formData.append("lesson_id", lessonId);

        dispatch(uploadWeblink(formData));
    };

    const handleClear = () => {
        setLink("");
        dispatch(resetWeblinkState());
    };

    // Redirect on success
    useEffect(() => {
        if (success) {
            setLink("");

            const timer = setTimeout(() => {
                dispatch(resetWeblinkState());
                navigate(-1);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [success, dispatch, navigate]);

    return (
        <div className="add-weblink-page">
            <div className="add-weblink-navbar">
                <Instructornavbar />
            </div>

            <div className="add-weblink-container">
                <div className="add-weblink-card">
                    <div className="add-weblink-header">
                        <BackButton />
                        <h2 className="add-weblink-title">Upload Weblink</h2>
                    </div>

                    <div className="add-weblink-body">
                        <form className="add-weblink-form" onSubmit={handleSubmit}>
                            <input
                                id="weblink"
                                type="text"
                                className="add-weblink-input"
                                placeholder="Enter web link"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                            />

                            {success && (
                                <p className="add-weblink-success">{successMessage}</p>
                            )}
                            {error && (
                                <p className="add-weblink-error">{errorMessage}</p>
                            )}

                            <div className="add-weblink-buttons">
                                <button
                                    type="submit"
                                    className="add-weblink-btn add-weblink-ok"
                                    disabled={loading || !link.trim()}
                                >
                                    {loading ? "Uploading..." : "OK"}
                                </button>

                                <button
                                    type="button"
                                    className="add-weblink-btn add-weblink-clear"
                                    onClick={handleClear}
                                >
                                    Clear
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AddWeblink;
