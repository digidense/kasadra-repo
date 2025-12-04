import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { fetchInstructorCourses } from "../../../features/instructor/addCourse/AddCourseAuthSlice.js";
import {
    fetchBatches,
    fetchStudentsByCourse,
    clearBatches,
    setSelectedCourse
} from "../../../features/instructor/assignBatch/assignBatchSlice.js";

import "../../../styles/instructor/assignBatch/AssignBatch.css";
import Instructornavbar from "../../../components/Instructornavbar";
import BackButton from "../../../components/BackButton";

const AssignBatchTable = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { courses } = useSelector((state) => state.course);
    const { batches, students, selectedCourseId } = useSelector((state) => state.batches);

    const [selectedCourse, setSelectedCourseState] = useState("");
    const [selectedBatch, setSelectedBatch] = useState("All");
    const [searchText, setSearchText] = useState("");
    const [searchOpen, setSearchOpen] = useState(false);
    const [selectedStudents, setSelectedStudents] = useState([]);

    // NEW
    const [hasAssignedSelected, setHasAssignedSelected] = useState(false);

    // -----------------------------------------------
    // Load instructor courses ONLY once
    // -----------------------------------------------
    useEffect(() => {
        if (courses.length === 0) {
            dispatch(fetchInstructorCourses());
        }
    }, [courses.length, dispatch]);

    // -----------------------------------------------
    // Correct & FINAL course-change effect
    // -----------------------------------------------
    useEffect(() => {
        if (!selectedCourse) {
            dispatch(clearBatches());
            return;
        }

        dispatch(clearBatches());
        dispatch(fetchBatches(selectedCourse));
        dispatch(fetchStudentsByCourse(selectedCourse));
    }, [selectedCourse, dispatch]);

    // -----------------------------------------------
    // Restore previous state when user returns
    // -----------------------------------------------
    useEffect(() => {
        if (!selectedCourse && selectedCourseId) {
            setSelectedCourseState(selectedCourseId);

            dispatch(clearBatches()); // ⭐ FIX ADDED HERE

            dispatch(fetchStudentsByCourse(selectedCourseId));
            dispatch(fetchBatches(selectedCourseId));
        }
    }, [dispatch, selectedCourse, selectedCourseId]);


    // -----------------------------------------------
    // CHECK SELECTED STUDENTS — Assigned or not?
    // -----------------------------------------------
    useEffect(() => {
        const foundAssigned = selectedStudents.some((sid) => {
            const st = students.find((s) => s.student_id === sid);
            return st && st.batch_name && st.batch_name !== "null";
        });

        setHasAssignedSelected(foundAssigned);
    }, [selectedStudents, students]);

    // -----------------------------------------------
    // Reset selections when course changes
    // -----------------------------------------------
    useEffect(() => {
        setSelectedStudents([]);
        setHasAssignedSelected(false);
    }, [selectedCourse]);

    // -----------------------------------------------
    // Handlers
    // -----------------------------------------------
    const handleCourseChange = (e) => {
        const cid = e.target.value;

        setSelectedCourseState(cid);
        dispatch(setSelectedCourse(cid)); // sync with redux
    };

    const toggleStudentSelection = (studentId) => {
        setSelectedStudents((prev) =>
            prev.includes(studentId)
                ? prev.filter((id) => id !== studentId)
                : [...prev, studentId]
        );
    };

    return (
        <div className="assign-batch-wrap">
            <Instructornavbar />

            <div className="assign-batch-page">
                {/* Header Section */}
                <div className="assign-batch-all-header">
                    <div className="assign-batch-header-left">
                        <BackButton to="/instructor/home" />
                        <div className="assign-batch-header">
                            <p className="assign-batch-title">Assign Students to Batches</p>
                        </div>
                    </div>

                    {/* Filters Row */}
                    <div className="assign-batch-controls">
                        {/* Search Box */}
                        <div className="assign-batch-search-box">
                            <input
                                type="text"
                                className={`assign-batch-search-input ${searchOpen ? "open" : ""}`}
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                placeholder="Search students..."
                            />

                            <button
                                type="button"
                                className="assign-batch-search-btn"
                                onClick={() => setSearchOpen(!searchOpen)}
                            >
                                🔍
                            </button>
                        </div>

                        {/* Course Dropdown */}
                        <div className="assign-batch-control-item">
                            <label>Select Course</label>
                            <select
                                value={selectedCourse}
                                onChange={handleCourseChange}
                                className="assign-batch-select"
                            >
                                <option value="">Dropdown list of courses</option>
                                {courses.map((course) => (
                                    <option key={course.id} value={course.id}>
                                        {course.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Batch Dropdown */}
                        <div className="assign-batch-control-item">
                            <label>Select Batch</label>
                            <select
                                value={selectedBatch}
                                onChange={(e) => setSelectedBatch(e.target.value)}
                                disabled={!selectedCourse}
                                className="assign-batch-select"
                            >
                                <option value="All">All</option>
                                <option value="Unassigned">Unassigned</option>

                                {batches.map((b) => (
                                    <option key={b.batch_id} value={b.batch_name}>
                                        {b.batch_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="assign-batch-body">
                    <div className="assign-batch-card">
                        <div className="assign-batch-table-wrapper">
                            <table className="assign-batch-table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Current Batch</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {students
                                        .filter((student) => {
                                            if (searchText.trim() !== "") {
                                                if (!student.name.toLowerCase().includes(searchText.toLowerCase())) {
                                                    return false;
                                                }
                                            }

                                            if (selectedBatch === "All") return true;

                                            if (selectedBatch === "Unassigned") {
                                                return (
                                                    !student.batch_name ||
                                                    student.batch_name === "null"
                                                );
                                            }

                                            return student.batch_name === selectedBatch;
                                        })
                                        .map((student) => (
                                            <tr key={student.student_id}>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedStudents.includes(student.student_id)}
                                                        onChange={() => toggleStudentSelection(student.student_id)}
                                                    />
                                                </td>

                                                <td>{student.name}</td>
                                                <td>{student.batch_name || "Unassigned"}</td>
                                                <td>
                                                    <td>
                                                        <button
                                                            className={student.batch_name ? "move-btn" : "assign-btn"}
                                                            onClick={() => {
                                                                const isAssigned = student.batch_name && student.batch_name !== "null";

                                                                navigate("/instructor/assign-batch/select", {
                                                                    state: {
                                                                        selectedStudents: [student.student_id],
                                                                        courseId: selectedCourse,
                                                                        mode: isAssigned ? "move" : "assign",
                                                                    },
                                                                });
                                                            }}
                                                        >
                                                            {student.batch_name ? "Move" : "Assign"}
                                                        </button>
                                                    </td>

                                                </td>

                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Footer Buttons */}
                    <div className="assign-batch-buttons">
                        <button
                            className="assign-batch-btn"
                            disabled={hasAssignedSelected || selectedStudents.length === 0}
                            style={{
                                opacity: hasAssignedSelected ? 0.4 : 1,
                                cursor: hasAssignedSelected ? "not-allowed" : "pointer",
                            }}
                            onClick={() => {
                                if (hasAssignedSelected) {
                                    alert("⚠️ Please select only unassigned students to assign.");
                                    return;
                                }

                                navigate("/instructor/assign-batch/select", {
                                    state: {
                                        selectedStudents,
                                        courseId: selectedCourse,
                                    },
                                });
                            }}
                        >
                            Assign to
                        </button>

                        <button
                            className="assign-batch-btn-move"
                            disabled={!hasAssignedSelected || selectedStudents.length === 0}
                            style={{
                                opacity: !hasAssignedSelected ? 0.4 : 1,
                                cursor: !hasAssignedSelected ? "not-allowed" : "pointer",
                            }}
                            onClick={() => {
                                if (!hasAssignedSelected) {
                                    alert("Please select only assigned students to move.");
                                    return;
                                }

                                navigate("/instructor/assign-batch/select", {
                                    state: {
                                        selectedStudents,
                                        courseId: selectedCourse,
                                        mode: "move",
                                    },
                                });
                            }}
                        >
                            Move To
                        </button>

                        <button
                            className="assign-batch-btn-create"
                            onClick={() => navigate("/instructor/assign-batch/create-new-batch")}
                        >
                            ➕ Create New Batch
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssignBatchTable;
