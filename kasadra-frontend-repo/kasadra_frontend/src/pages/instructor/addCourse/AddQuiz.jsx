import React, { useState, useEffect } from "react";
import "../../../styles/instructor/addCourse/AddQuiz.css";
import BackButton from "../../../components/BackButton";
import Instructornavbar from "../../../components/Instructornavbar";
import { useParams, useNavigate } from "react-router-dom";
import { addQuiz, resetQuizState } from "../../../features/instructor/addCourse/addQuizSlice.js";
import { useDispatch, useSelector } from "react-redux";

const AddQuiz = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId, lessonId } = useParams();

  const { loading, success, error } = useSelector((state) => state.quiz);

  const [quizName, setQuizName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [pdf, setPdf] = useState(null);

  const [errors, setErrors] = useState({});

  // ---- URL Validation ----
  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // ---- Validation ----
  const validate = () => {
    const newErrors = {};

    if (!quizName.trim()) newErrors.quizName = "Quiz name is required";

    if (!link.trim()) {
      newErrors.link = "Link is required";
    } else if (!isValidURL(link)) {
      newErrors.link = "Enter a valid URL";
    }

    return newErrors;
  };

  // ---- File validation ----
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed!");
      e.target.value = null;
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File must be less than 5MB");
      e.target.value = null;
      return;
    }

    setPdf(file);
  };

  // ---- Success effect ----
  useEffect(() => {
    if (success) {
      setQuizName("");
      setDescription("");
      setLink("");
      setPdf(null);

      const timer = setTimeout(() => {
        dispatch(resetQuizState());
        navigate(`/instructor/${courseId}/${lessonId}/lesson-content`);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [success]);

  // ---- Submit ----
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    dispatch(resetQuizState()); // clear old state before submit

    const formData = new FormData();
    formData.append("course_id", courseId);
    formData.append("lesson_id", lessonId);
    formData.append("name", quizName);
    formData.append("description", description);
    formData.append("url", link);
    if (pdf) formData.append("file", pdf);

    dispatch(addQuiz(formData));
  };

  // ---- Clear ----
  const handleClear = () => {
    setQuizName("");
    setDescription("");
    setLink("");
    setPdf(null);
    setErrors({});
  };

  // ---- Input text change ----
  const handleChange = (field, value) => {
    if (field === "quizName") setQuizName(value);
    if (field === "description") setDescription(value);
    if (field === "link") setLink(value);

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="add-quiz-page">
      <div className="add-quiz-navbar">
        <Instructornavbar />
      </div>

      <div className="add-quiz-body">
        <div className="add-quiz-card">

          <div className="add-quiz-header">
            <BackButton />
            <h2>Quiz</h2>
          </div>

          <form onSubmit={handleSubmit} className="add-quiz-form">

            {/* Quiz Name */}
            <div className="add-quiz-input-group">
              <label className="add-quiz-label">Quiz Name</label>
              <input
                type="text"
                placeholder="Enter quiz name"
                value={quizName}
                onChange={(e) => handleChange("quizName", e.target.value)}
                className={errors.quizName ? "add-quiz-error-input" : ""}
              />
              {errors.quizName && (
                <p className="add-quiz-error-text">{errors.quizName}</p>
              )}
            </div>

            {/* Description */}
            <div className="add-quiz-input-group">
              <label className="add-quiz-label">Description (Optional)</label>
              <textarea
                placeholder="Enter quiz description"
                value={description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>

            {/* Link */}
            <div className="add-quiz-input-group">
              <label className="add-quiz-label">Link</label>
              <input
                type="text"
                placeholder="Enter quiz link"
                value={link}
                onChange={(e) => handleChange("link", e.target.value)}
                className={errors.link ? "add-quiz-error-input" : ""}
              />
              {errors.link && (
                <p className="add-quiz-error-text">{errors.link}</p>
              )}
            </div>

            {/* PDF Upload */}
            <div className="add-quiz-input-group">
              <label className="add-quiz-label">Upload PDF (Optional)</label>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
              />
            </div>

            {/* Success / Error */}
            {success && (
              <p className="add-quiz-success">Quiz added successfully!</p>
            )}

            {error && (
              <p className="add-quiz-error-msg">{error || "Something went wrong"}</p>
            )}

            {/* Buttons */}
            <div className="add-quiz-buttons">
              <button
                type="submit"
                className="add-quiz-ok-btn"
                disabled={loading }
              >
                {loading ? "Uploading..." : "OK"}
              </button>

              <button
                type="button"
                className="add-quiz-clear-btn"
                onClick={handleClear}
                disabled={loading}
              >
                Clear
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
};

export default AddQuiz;
