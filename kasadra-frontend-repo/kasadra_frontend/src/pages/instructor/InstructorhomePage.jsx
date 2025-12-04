

import React, { useEffect } from "react";
import Instructornavbar from "../../components/Instructornavbar";
import {
  FaUsers,
  FaBook,
  FaChalkboardTeacher,
  FaBroadcastTower,
  FaRegCalendarAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchInstructorProfile } from "../../features/auth/instructorProfileslice.js";
import "../../styles/instructor/Instructorhome.css";

const InstructorhomePage = () => {
  const dispatch = useDispatch();

  // ✅ Get instructor from Redux store
  const { profile: instructor, loading, error } = useSelector(
    (state) => state.instructorProfile
  );

  useEffect(() => {
    dispatch(fetchInstructorProfile());
  }, [dispatch]);

//   if (loading) return <p>Loading...</p>;
  if (error) return <p>Error {error}</p>;

  console.log(instructor);


  return (
    <div>
      <Instructornavbar />
      <div className="containers">
        <h3>Welcome!</h3>
        <p className="instructor-profile-name" style={{ color: "black" }}>
          {" "}
          {instructor?.name}
        </p>

        <div className="card-grid">
          <Link to="/instructor/user-management" className="card">
            <FaUsers className="card-icon" />
            <span>User Management</span>
          </Link>

          <Link to="/instructor/add-course" className="card">
            <FaBook className="card-icon" />
            <span>Add Course</span>
          </Link>

          <Link to="/instructor/assign-batch" className="card">
            <FaChalkboardTeacher className="card-icon" />
            <span>Assign Batch</span>
          </Link>

          <Link to="/instructor/live-student-activity" className="card">
            <FaBroadcastTower className="card-icon" />
            <span>Live Class Update</span>
          </Link>

          <Link to="/instructor/schedule-class" className="card">
            <FaRegCalendarAlt className="card-icon" />
            <span>Schedule Class</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InstructorhomePage;

