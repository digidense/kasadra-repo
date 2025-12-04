
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCourseAPI } from "../../../api/instructor/addCourse/AddcourseAuth.js";
import "../../../styles/instructor/addCourse/AddNewCourse.css";
import Instructornavbar from "../../../components/Instructornavbar";
import BackButton from "../../../components/BackButton.jsx";

const AddNewCourse = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // ✅ added loading state

  // 🧠 helper to handle both Save & Add Content
  const handleAddCourse = async (e, shouldNavigateToContent = false) => {
    e.preventDefault();
    const form = e.target.form || e.target.closest("form");

    if (!form.thumbnail.files.length) {
      alert("Please select a thumbnail image.");
      return;
    }

    const file = form.thumbnail.files[0];
    const fd = new FormData();
    fd.append("title", form.title.value);
    fd.append("description", form.description.value);
    fd.append("duration", form.duration.value);
    fd.append("thumbnail", file);
    fd.append("instructor_id", localStorage.getItem("instructorId"));

    try {
      const course = await addCourseAPI(fd); // course = response.data
      console.log("Course Added:", course);

      form.reset();
      alert("Course added successfully!");

      // ✅ Use correct property from backend response
      const courseId = course.course_id;

      if (shouldNavigateToContent && courseId) {
        // navigate(`/instructor/add-course/${courseId}/add-content`);
        navigate(`/courses/${courseId}/add-content`);
      } else {
        navigate("/instructor/add-course"); // Save button
      }
    } catch (err) {
      console.error("Add failed", err.response?.data || err.message);
      alert("Failed to add course.");
    }
  };



  return (
    <div className="course-form-container">
      <Instructornavbar />
      <div className="form-header-close">
        <BackButton className="schedual-details-close-button" />
      </div>

      <h2 className="form-title">Add Your Course Details</h2>

      <form className="course-form" data-testid="add-course-form">
        <div className="form-group">
          <label>Course Title</label>
          <input type="text" name="title" placeholder="Enter course title" data-testid="input-title" required />
        </div>

        <div className="form-group">
          <label>Course Description</label>
          <textarea name="description" rows="4" placeholder="Enter course description" data-testid="input-description" required />
        </div>

        <div className="form-group">
          <label>Duration</label>
          <input type="text" name="duration" placeholder="e.g. 3 months" data-testid="input-duration" required />
        </div>

        <div className="form-group">
          <label>Instructor</label>
          <input
            type="text"
            value={localStorage.getItem("instructorName") || "Instructor Name"}
            name="instructor-name"
            readOnly
          />
        </div>

        <div className="form-group">
          <label htmlFor="input-thumbnail">Thumbnail</label>
          <input type="file" accept="image/*" data-testid="input-thumbnail" id="input-thumbnail" name="thumbnail" />
        </div>

        <div className="form-buttons">
          {/* Save Button */}
          <button
            type="button"
            className="btn save-btn"
            onClick={(e) => handleAddCourse(e, false)}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}

          </button>

          <button
            type="button"
            className="btn add-btn"
            data-testid="submit-button"
            onClick={(e) => handleAddCourse(e, true)}
          >
            Add Content
          </button>


          {/* Clear Button */}
          <button
            type="button"
            className="btn cancel-btn"
            onClick={(e) => e.target.closest("form").reset()}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewCourse;
