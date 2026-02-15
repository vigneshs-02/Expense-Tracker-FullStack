import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../styles/layout.css";

const Sidebar = () => {

  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || ""
  );

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) {
      setUserName(name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      localStorage.setItem("profileImage", reader.result);
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <aside className="sidebar">

      <h2 className="logo">Expense Tracker</h2>

      <div className="profile">

        <div className="image-wrapper">
          <img
            src={
              profileImage
                ? profileImage
                : "./profile.jpg"
            }
            alt="user"
            className="profile-img"
          />

          <label className="upload-btn">
            +
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              hidden
            />
          </label>
        </div>

        <h4>{userName || "User"}</h4>

      </div>

      <ul className="menu">
        <li>
          <img src="./dashboard.png" alt="" />
          <NavLink to="/home">Dashboard</NavLink>
        </li>
        <li>
          <img src="./Rupees.png" alt="" />
          <NavLink to="/income">Income</NavLink>
        </li>
        <li>
          <img src="./wallet.png" alt="" />
          <NavLink to="/expense">Expense</NavLink>
        </li>
        <li className="logout" onClick={handleLogout}> <img src="./logout.png" alt="" />
          Logout
        </li>
      </ul>

    </aside>
  );
};

export default Sidebar;
