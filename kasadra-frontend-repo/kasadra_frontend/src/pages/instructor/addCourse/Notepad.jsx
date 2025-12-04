        


// import React, { useRef, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { createNote, resetNoteState } from "../../../features/instructor/addCourse/notePadSlice";
// import "../../../styles/instructor/addCourse/NotePad.css";
// import Instructornavbar from "../../../components/Instructornavbar";

// const NotepadEditor = () => {
//     const dispatch = useDispatch();
//     const { loading, success, error, successMessage, errorMessage } = useSelector((state) => state.notes);
//     const { courseId, lessonId } = useParams();
//     const instructorId = localStorage.getItem("instructorId");

//     const editorRef = useRef(null);

//     const applyFormat = (cmd) => document.execCommand(cmd, false, null);
//     const applyHighlight = () => document.execCommand("backColor", false, "yellow");

//     const handleSave = () => {
//         if (!editorRef.current) return;
//         const text = editorRef.current.innerHTML;

//         if (!text.trim()) return alert("Note is empty!");
//         if (!courseId || !lessonId || !instructorId) return alert("Missing required IDs!");

//         const payload = {
//             course_id: Number(courseId),
//             lesson_id: Number(lessonId),
//             instructor_id: Number(instructorId),
//             notes: text,
//         };

//         dispatch(createNote(payload));
//     };

//     const handleClear = () => {
//         if (editorRef.current) editorRef.current.innerHTML = "";
//         dispatch(resetNoteState());
//     };

//     // Auto clear messages after 3 seconds
//     useEffect(() => {
//         if (success || error) {
//             const timer = setTimeout(() => dispatch(resetNoteState()), 3000);
//             return () => clearTimeout(timer);
//         }
//     }, [success, error, dispatch]);

//     return (
//         <>
//             <div className="note-content-navbar">
//                 <Instructornavbar />
//             </div>

//             <div className="editor-container">
//                 <h2 className="editor-title">Notes</h2>

//                 <div className="toolbar">
//                     <button onClick={() => applyFormat("bold")}><b>B</b></button>
//                     <button onClick={() => applyFormat("italic")}><i>I</i></button>
//                     <button onClick={() => applyFormat("underline")}><u>U</u></button>
//                     <button onClick={applyHighlight} className="highlight-btn">H</button>
//                     <button onClick={() => applyFormat("insertUnorderedList")}>• List</button>
//                     <button onClick={() => applyFormat("insertOrderedList")}>1. List</button>
//                 </div>

//                 <div
//                     ref={editorRef}
//                     className="editor-box"
//                     contentEditable
//                     suppressContentEditableWarning={true}
//                 ></div>

//                 {/* Success / Error Messages */}
//                 {success && <p className="editor-message editor-success">{successMessage}</p>}
//                 {error && <p className="editor-message editor-error">{errorMessage}</p>}

//                 <div className="editor-actions">
//                     <button className="btn primary" onClick={handleSave} disabled={loading}>
//                         {loading ? "Saving..." : "Save"}
//                     </button>
//                     <button className="btn secondary" onClick={handleClear}>Clear</button>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default NotepadEditor;     

// import React, { useRef, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { createNote, resetNoteState } from "../../../features/instructor/addCourse/notePadSlice";
// import "../../../styles/instructor/addCourse/NotePad.css";
// import Instructornavbar from "../../../components/Instructornavbar";

// const NotepadEditor = () => {
//   const dispatch = useDispatch();
//   const { courseId, lessonId } = useParams();
//   const instructorId = localStorage.getItem("instructorId");

//   const { loading, success, error, successMessage, errorMessage } = useSelector(state => state.notes);

//   const editorRef = useRef(null);

//   const applyFormat = (cmd) => document.execCommand(cmd, false, null);
//   const applyHighlight = () => document.execCommand("backColor", false, "yellow");

//   const handleSave = () => {
//     if (!editorRef.current) return;
//     const text = editorRef.current.innerHTML;

//     if (!text.trim()) return alert("Note is empty!");
//     if (!courseId || !lessonId || !instructorId) return alert("Missing required IDs!");

//     const payload = {
//       course_id: Number(courseId),
//       lesson_id: Number(lessonId),
//       instructor_id: Number(instructorId),
//       notes: text, // Always saving as HTML
//     };

//     dispatch(createNote(payload));
//   };

//   const handleClear = () => {
//     if (editorRef.current) editorRef.current.innerHTML = "";
//     dispatch(resetNoteState());
//   };

//   // Auto-clear messages after 3 seconds
//   useEffect(() => {
//     if (success || error) {
//       const timer = setTimeout(() => dispatch(resetNoteState()), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [success, error, dispatch]);

//   return (
//     <>
//       <div className="note-content-navbar">
//         <Instructornavbar />
//       </div>

//       <div className="editor-container">
//         <h2 className="editor-title">Notes</h2>

//         <div className="toolbar">
//           <button onClick={() => applyFormat("bold")}><b>B</b></button>
//           <button onClick={() => applyFormat("italic")}><i>I</i></button>
//           <button onClick={() => applyFormat("underline")}><u>U</u></button>
//           <button onClick={applyHighlight} className="highlight-btn">H</button>
//           <button onClick={() => applyFormat("insertUnorderedList")}>• List</button>
//           <button onClick={() => applyFormat("insertOrderedList")}>1. List</button>
//         </div>

//         <div
//           ref={editorRef}
//           className="editor-box"
//           contentEditable
//           suppressContentEditableWarning={true}
//         ></div>

//         {success && <p className="editor-message editor-success">{successMessage}</p>}
//         {error && <p className="editor-message editor-error">{errorMessage}</p>}

//         <div className="editor-actions">
//           <button className="btn primary" onClick={handleSave} disabled={loading}>
//             {loading ? "Saving..." : "Save"}
//           </button>
//           <button className="btn secondary" onClick={handleClear}>Clear</button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default NotepadEditor;    

import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createNote, reset } from "../../../features/instructor/addCourse/notePadSlice";
import "../../../styles/instructor/addCourse/NotePad.css";
import Instructornavbar from "../../../components/Instructornavbar";

const NotepadEditor = () => {
  const dispatch = useDispatch();
  const { courseId, lessonId } = useParams();
  const instructorId = localStorage.getItem("instructorId");

  const { notes, loading, success, error, successMessage, errorMessage } = useSelector(
    (state) => state.notes
  );

  const editorRef = useRef(null);

  // Text formatting functions
  const applyFormat = (cmd) => document.execCommand(cmd, false, null);
  const applyHighlight = () => document.execCommand("backColor", false, "yellow");

  // Save note
  const handleSave = () => {
    if (!editorRef.current) return;
    const text = editorRef.current.innerHTML;

    if (!text.trim()) return alert("Note is empty!");
    if (!courseId || !lessonId || !instructorId) return alert("Missing required IDs!");

    const payload = {
      course_id: Number(courseId),
      lesson_id: Number(lessonId),
      instructor_id: Number(instructorId),
      notes: text, // save HTML
    };

    dispatch(createNote(payload));
  };

  // Clear editor
  const handleClear = () => {
    if (editorRef.current) editorRef.current.innerHTML = "";
    dispatch(reset());
  };

  // Auto-clear messages after 3 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => dispatch(reset()), 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error, dispatch]);

  // Load the latest saved note into editor
  useEffect(() => {
    if (success && editorRef.current && notes.length > 0) {
      const latestNote = notes[notes.length - 1];
      editorRef.current.innerHTML = latestNote.notes; // load HTML content
    }
  }, [success, notes]);

  return (
    <>
      <div className="note-content-navbar">
        <Instructornavbar />
      </div>

      <div className="editor-container">
        <h2 className="editor-title">Notes</h2>

        <div className="toolbar">
          <button onClick={() => applyFormat("bold")}><b>B</b></button>
          <button onClick={() => applyFormat("italic")}><i>I</i></button>
          <button onClick={() => applyFormat("underline")}><u>U</u></button>
          <button onClick={applyHighlight} className="highlight-btn">H</button>
          <button onClick={() => applyFormat("insertUnorderedList")}>• List</button>
          <button onClick={() => applyFormat("insertOrderedList")}>1. List</button>
        </div>

        <div
          ref={editorRef}
          className="editor-box"
          contentEditable
          suppressContentEditableWarning={true}
        ></div>

        {success && <p className="editor-message editor-success">{successMessage}</p>}
        {error && <p className="editor-message editor-error">{errorMessage}</p>}

        <div className="editor-actions">
          <button className="btn primary" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
          <button className="btn secondary" onClick={handleClear}>Clear</button>
        </div>
      </div>
    </>
  );
};

export default NotepadEditor;
