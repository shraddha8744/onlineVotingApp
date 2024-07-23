// App.js
import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Allcandidate from "./components/Allcandidate";
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import store from "./store/store";
import LoginStatus from "./components/LoginStatus";
import AddCandidate from "./components/AddCandidate";
import EditCandidateCard from "./components/EditCandidateCard";
import VoteCount from "./components/VoteCount";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <div className="pt-[85px]">
          <Outlet />
        </div>
      </div>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "/signup",
        element: (
          <PublicRoute>
            <Signup />
          </PublicRoute>
        ),
      },
      {
        path: "/all",
        element: (
          <PrivateRoute>
            <Allcandidate />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-candidate",
        element: (
          <PrivateRoute>
            <AddCandidate />
          </PrivateRoute>
        ),
      },
      {
        path: "/edit/:id",
        element: (
          <PrivateRoute>
            <EditCandidateCard />
          </PrivateRoute>
        ),
      },
      {
        path: "/vote-count",
        element: (
          <PrivateRoute>
            <VoteCount />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

const App = () => {
  return (
    <Provider store={store}>
      <LoginStatus />
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
