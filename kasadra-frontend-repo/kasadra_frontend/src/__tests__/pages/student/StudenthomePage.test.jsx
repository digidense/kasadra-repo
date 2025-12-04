// src/__tests__/Pages/StudenthomePage.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import StudenthomePage from "../../../pages/student/StudenthomePage";
import authReducer from "../../../features/auth/authSlice";

const renderWithStore = (preloadedState) => {
  const store = configureStore({
    reducer: { auth: authReducer },
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <StudenthomePage />
      </MemoryRouter>
    </Provider>
  );
};

describe("StudenthomePage", () => {
  it("renders welcome text with default 'Student' when no user", () => {
    renderWithStore({ auth: { user: null } });
    expect(screen.getByText(/Welcome Student/i)).toBeInTheDocument();
  });

  it("renders welcome text with user's name when user exists", () => {
    renderWithStore({ auth: { user: { name: "Shabu" } } });
    expect(screen.getByText(/Welcome Shabu/i)).toBeInTheDocument();
  });

  it("renders navigation buttons", () => {
    renderWithStore({ auth: { user: null } });
    expect(screen.getByText(/My Courses/i)).toBeInTheDocument();
    expect(screen.getByText(/My Profile/i)).toBeInTheDocument();
    expect(screen.getByText(/My Performance/i)).toBeInTheDocument();
  });

  it("renders links with correct href", () => {
    renderWithStore({ auth: { user: null } });
    expect(screen.getByText(/My Course/i).closest("a")).toHaveAttribute(
      "href",
      "/student/my-course"
    );
    // expect(screen.getByText(/My Profile/i).closest("a")).toHaveAttribute(
    //   "href",
    //   "/profile"
    // );
    // expect(screen.getByText(/My Performance/i).closest("a")).toHaveAttribute(
    //   "href",
    //   "/performance"
    // );
  });
});
