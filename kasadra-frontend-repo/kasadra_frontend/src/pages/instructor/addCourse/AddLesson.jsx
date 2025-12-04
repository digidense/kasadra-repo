// import React, { useState, useEffect, use } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import "../../../styles/instructor/addCourse/AddLesson.css";
// import Instructornavbar from "../../../components/Instructornavbar";
// import { addLesson, resetLessonState } from "../../../features/instructor/addCourse/addLessonSlice.js";

// const AddLesson = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [lessonName, setLessonName] = useState("");
//   const [description, setDescription] = useState("");
//   const [validationError, setValidationError] = useState("");

//   const { courseId } = useParams();
//   const instructorId = localStorage.getItem("instructorId");

//   // ✅ Redux state
//   const { loading, success, error } = useSelector((state) => state.lesson);

//   useEffect(() => {
//     // Reset success/error when component mounts
//     dispatch(resetLessonState());
//   }, [dispatch]);

//   useEffect(() => {
//     if (success) {
//       setLessonName("");
//       setDescription("");
//       setTimeout(() => {
//         dispatch(resetLessonState());
//         navigate(`/courses/${courseId}/add-content`);
//       }, 2000);
//     }
//   }, [success, dispatch]);

//   const handleOk = () => {
//     setValidationError("");

//     if (!lessonName.trim() || !description.trim()) {
//       setValidationError("Please fill in both Lesson Name and Description.");
//       return;
//     }

//     if (!instructorId || !courseId) {
//       setValidationError("Instructor or Course ID missing!");
//       return;
//     }

//     const lessonData = {
//       instructor_id: Number(instructorId),
//       course_id: Number(courseId),
//       title: lessonName,
//       description,
//     };

//     dispatch(addLesson(lessonData));
//   };

//   const handleClear = () => {
//     setLessonName("");
//     setDescription("");
//     setValidationError("");
//   };

//   const handleAddContent = () => {
//     console.log("Navigate to Add Content page");
//   };

//   return (
//     <div className="add-lesson-container">
//       <div className="add-lesson-navbar">
//         <Instructornavbar />
//       </div>
//       <div className="add-lesson-body">
//         <div className="add-lesson-card">
//           <h2 className="add-lesson-title">Lesson</h2>

//           <div className="add-lesson-field">
//             <label>Lesson Name</label>
//             <input
//               type="text"
//               placeholder="Enter Lesson name"
//               value={lessonName}
//               onChange={(e) => setLessonName(e.target.value)}
//               className="add-lesson-input"
//             />
//           </div>

//           <div className="add-lesson-field">
//             <label>Description</label>
//             <textarea
//               placeholder="Enter Lesson description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="add-lesson-input"
//             />
//           </div>

//           {/* ✅ Validation & API messages */}
//           {validationError && <p className="add-lesson-error">{validationError}</p>}
//           {error && <p className="add-lesson-error">❌ {error}</p>}
//           {success && <p className="add-lesson-success">✅ Lesson added successfully!</p>}
//           {loading && <p className="add-lesson-loading">⏳ Adding lesson...</p>}

//           <div className="add-lesson-buttons">
//             <button
//               className="add-lesson-btn-ok"
//               onClick={handleOk}
//               disabled={loading}
//             >
//               {loading ? "Adding..." : "OK"}
//             </button>
//             <button className="add-lesson-btn-clear" onClick={handleClear}>
//               Clear
//             </button>
//             <button
//               className="add-lesson-btn-addcontent"
//               onClick={handleAddContent}
//             >
//               Add Content
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddLesson;


// import React, { useState, useEffect, use } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import "../../../styles/instructor/addCourse/AddLesson.css";
// import Instructornavbar from "../../../components/Instructornavbar";
// import { addLesson, resetLessonState } from "../../../features/instructor/addCourse/addLessonSlice.js";
// import { useLocation } from "react-router-dom";


// const AddLesson = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [lessonName, setLessonName] = useState("");
//   const [description, setDescription] = useState("");
//   const [validationError, setValidationError] = useState("");
//   const location = useLocation();

//   const { courseId } = useParams();
//   const instructorId = localStorage.getItem("instructorId");

//   // ✅ Redux state
//   const { loading, success, error } = useSelector((state) => state.lesson);

//   useEffect(() => {
//     // Reset success/error when component mounts
//     dispatch(resetLessonState());
//   }, [dispatch]);

//   useEffect(() => {
//     if (success) {
//       setLessonName("");
//       setDescription("");
//       setTimeout(() => {
//         dispatch(resetLessonState());
//         navigate(`/courses/${courseId}/add-content`);
//       }, 2000);
//     }
//   }, [success, dispatch]);

//   const handleOk = () => {
//     setValidationError("");

//     if (!lessonName.trim() || !description.trim()) {
//       setValidationError("Please fill in both Lesson Name and Description.");
//       return;
//     }

//     if (!instructorId || !courseId) {
//       setValidationError("Instructor or Course ID missing!");
//       return;
//     }

//     const lessonData = {
//       instructor_id: Number(instructorId),
//       course_id: Number(courseId),
//       title: lessonName,
//       description,
//     };

//     dispatch(addLesson(lessonData));
//   };

//   const handleClear = () => {
//     setLessonName("");
//     setDescription("");
//     setValidationError("");
//   };

//   const handleAddContent = () => {
//     console.log("Navigate to Add Content page");
//   };

//   return (
//     <div className="add-lesson-container">
//       <div className="add-lesson-navbar">
//         <Instructornavbar />
//       </div>
//       <div className="add-lesson-body">
//         <div className="add-lesson-card">
//           <h2 className="add-lesson-title">Lesson</h2>

//           <div className="add-lesson-field">
//             <label>Lesson Name</label>
//             <input
//               type="text"
//               placeholder="Enter Lesson name"
//               value={lessonName}
//               onChange={(e) => setLessonName(e.target.value)}
//               className="add-lesson-input"
//             />
//           </div>

//           <div className="add-lesson-field">
//             <label>Description</label>
//             <textarea
//               placeholder="Enter Lesson description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="add-lesson-input"
//             />
//           </div>

//           {/* ✅ Validation & API messages */}
//           {validationError && <p className="add-lesson-error">{validationError}</p>}
//           {error && <p className="add-lesson-error">❌ {error}</p>}
//           {success && <p className="add-lesson-success">✅ Lesson added successfully!</p>}
//           {loading && <p className="add-lesson-loading">⏳ Adding lesson...</p>}

//           <div className="add-lesson-buttons">
//             <button
//               className="add-lesson-btn-ok"
//               onClick={handleOk}
//               disabled={loading}
//             >
//               {loading ? "Adding..." : "OK"}
//             </button>
//             <button className="add-lesson-btn-clear" onClick={handleClear}>
//               Clear
//             </button>
//             <button
//               className="add-lesson-btn-addcontent"
//               onClick={handleAddContent}
//             >
//               Add Content
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddLesson;   


import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "../../../styles/instructor/addCourse/AddLesson.css";
import Instructornavbar from "../../../components/Instructornavbar";
import { addLesson, resetLessonState } from "../../../features/instructor/addCourse/addLessonSlice.js";
import BackButton from "../../../components/BackButton";

const AddLesson = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [lessonName, setLessonName] = useState("");
  const [description, setDescription] = useState("");
  const [validationError, setValidationError] = useState("");

  const { courseId } = useParams();
  const instructorId = localStorage.getItem("instructorId");

  const { loading, success, error } = useSelector((state) => state.lesson);

  // Reset state on mount
  useEffect(() => {
    dispatch(resetLessonState());
  }, [dispatch]);

  // When lesson added successfully
  useEffect(() => {
    if (success) {
      setLessonName("");
      setDescription("");

      // 🔥 Pass batchId back to AddContent
      const batchId = location.state?.batchId || null;

      setTimeout(() => {
        dispatch(resetLessonState());
        navigate(`/courses/${courseId}/add-content`, {
          state: { batchId, refresh: true },
        });
      }, 800);
    }
  }, [success, dispatch, navigate, courseId, location.state]);

  const handleOk = () => {
    setValidationError("");

    if (!lessonName.trim() || !description.trim()) {
      setValidationError("Please fill in both Lesson Name and Description.");
      return;
    }

    const lessonData = {
      instructor_id: Number(instructorId),
      course_id: Number(courseId),
      title: lessonName,
      description,
    };

    dispatch(addLesson(lessonData));
  };

  return (
    <div className="add-lesson-container">
      <div className="add-lesson-navbar">
        <Instructornavbar />
      </div>

      <div className="add-lesson-body">
        <div className="add-lesson-card">
          <div className="add-lesson-header">
            <BackButton />
            <h2 className="add-lesson-title">Add New Lesson</h2>
          </div>

          <div className="add-lesson-field">
            <label>Lesson Name</label>
            <input
              type="text"
              placeholder="Enter Lesson name"
              value={lessonName}
              onChange={(e) => setLessonName(e.target.value)}
              className="add-lesson-input"
            />
          </div>

          <div className="add-lesson-field">
            <label>Description</label>
            <textarea
              placeholder="Enter Lesson description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="add-lesson-input"
            />
          </div>

          {validationError && <p className="add-lesson-error">{validationError}</p>}
          {error && <p className="add-lesson-error">❌ {error}</p>}
          {success && <p className="add-lesson-success">✅ Lesson added successfully!</p>}
          {loading && <p className="add-lesson-loading">⏳ Adding lesson...</p>}

          <div className="add-lesson-buttons">
            <button className="add-lesson-btn-ok" onClick={handleOk} disabled={loading}>
              {loading ? "Adding..." : "OK"}
            </button>

            <button
              className="add-lesson-btn-clear"
              onClick={() => {
                setLessonName("");
                setDescription("");
                setValidationError("");
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLesson;

