import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logout } from "../slice/userSlice";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({});
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getUserInfo = async () => {
    try {
      let response = await axios.get("http://localhost:8080/api/profile", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setUserInfo(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePassword = async () => {
    const token = localStorage.getItem("token");

    try {
      let response = await axios.put(
        "http://localhost:8080/api/profile/password",
        {
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setShowChangePassword(false);
        setPasswords({
          currentPassword: "",
          newPassword: "",
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    dispatch(logout());

    navigate("/");
    toast.success("Logged out successfully.");
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Toaster />
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJUAAACUCAMAAACtIJvYAAAAMFBMVEXk5ueutLenrrLn6eqrsbTIzM7c3+DZ3N3h4+TLz9G3vL/FycyyuLu/xMa8wcTW2dvhxa0RAAADa0lEQVR4nO2a0ZKrIAyGwSACIrz/2x617dZuu5VEE5w5fDc705v9JkBA+JVqNBqNRqPRaDQajUaj0bgYsFBbYsMs42z2/Th6n61TV3ADGPoUzQMdUu9qFw2s17PKC8ZE7yp6gRr1L6W7WPC16gXK/y7TxkvnKlrgwp9Oq9dYQ8p/dVrLZaXLtS+1IDyKMJVI6U5UC/oiKdlqwVgqJVgtyF2plNbRCVnZcqd5JUaZYkEqHr9Vy0togUeM38ogYOUiUsoE/mIh1t8DiXWIltI6cTuV988NJjNbuYCX0mZiHsJMKNU8s3ilCnflt2Lx9izA9qo7idXKEq1Yd8Oys94nOPs7TEQp1t5A6gur1cg4sdB74A+c092SrThPWajz3guG0WqgLkHdXdLqmrX6/6zoa/CaVpxnd3pvZz00JKpVz2h1zd0ZaAfkecOxjFZKEU99gfUOBGiLkPUgQz6Mcn8QEk8N3J/0lN7A2hcWUPd8D/jv+4BQKu4PekX5pjfsTjPYvZB9Vi2AQ86swO+k0Ld93SB0iYy5mBEZvxvlVob99vFJcYeXegO4UfhZYcTeS1ZgKJQSfre0n9/BX6SSaKVW3N5KFFx9G8B/K5fRQn3qTWsu1x9eRvdVlG5eNn2o16w61gx/LF596LYVM51OVQMpdy/l8hTj+pkx/xnzNVJFa/ZK2QWnaseJbtyiYO7J88dqQm7IfpxSmMfvlr6KMYQ09j67CmZLPG3wKa4L7j1/tfwQQ59FBxRU7lPsdtM7RofRiwTXlhWX9P4e+NNNdfCWeVEC5FHvFunNjLWBgevj3+m07xWbmAoGdioeuA9iJjHkB+Ydj1SmrVjI59YL3B9hR6RXOvF0A6o/Wqen11nzHobvYUeclj7luX4evPOcVq9wPBoJ9sRC3bUOl4v+KP+NbjomRcnqFGAO3dPgsnIo6JOLUYqudfo8f8HQOiqvlKZVi3X47lpYJ0KoEE/ESqFDoRSwL6xF11MnaOG6PPnVGwnmgpmrpX8A0eSFxm/B+OJS0YKOREqlBon196D08ReoUQoiZVe6WVbKlN1VSnT1LWUdXtapMP5OeVg+RsG+Q47C0Cl57JHabDbsZzDowS8y+3s0OTV0xGr3Q4znA3CH/Xid6B54Z79jha4Cu4vQyb80qgr/stFoNBqNBo5/2FspaijLLGsAAAAASUVORK5CYII=" // replace with your logo path
            alt="Profile Logo"
            className="w-24 h-24 rounded-full"
          />
        </div>
        <h2 className="text-2xl font-bold text-center mb-4">Profile</h2>
        <div className="space-y-4">
          <div>
            <span className="font-semibold">Username:</span>{" "}
            <span>{userInfo.username}</span>
          </div>
          <div>
            <span className="font-semibold">Email:</span>{" "}
            <span>{userInfo.email}</span>
          </div>
          <div>
            <span className="font-semibold">Role:</span>{" "}
            <span>{userInfo.role}</span>
          </div>
          <div>
            <span className="font-semibold">Mobile:</span>{" "}
            <span>{userInfo.mobile}</span>
          </div>
          <div>
            <span className="font-semibold">Address:</span>{" "}
            <span>{userInfo.address}</span>
          </div>
          <div>
            <span className="font-semibold">Age:</span>{" "}
            <span>{userInfo.age}</span>
          </div>
        </div>
        <div className="mt-6">
          {showChangePassword ? (
            <div>
              <div className="mb-4">
                <input
                  type="password"
                  name="currentPassword"
                  placeholder="Current Password"
                  value={passwords.currentPassword}
                  onChange={handlePasswordChange}
                  className="border w-full py-2 px-3 rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  value={passwords.newPassword}
                  onChange={handlePasswordChange}
                  className="border w-full py-2 px-3 rounded"
                />
              </div>
              <div className="flex justify-between">
                <button
                  onClick={handleChangePassword}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Change Password
                </button>
                <button
                  onClick={() => setShowChangePassword(false)}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowChangePassword(true)}
              className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600"
            >
              Change Password
            </button>
          )}
        </div>
        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded w-full hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
