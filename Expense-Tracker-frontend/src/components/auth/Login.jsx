import { useState } from "react";
import { loginUser } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import "../../styles/auth.css";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.email || !formData.password) {
    setError("All fields required");
    return;
  }

  try {
    const response = await loginUser(formData);

    console.log("Login Success:", response.data);

    // Save userId (temporary auth method)
    localStorage.setItem("userId", response.data.id);

    localStorage.setItem("userName", response.data.name);


    navigate("/home");
  } catch (err) {
    console.error(err);
    setError("Invalid email or password");
  }
};


  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleSubmit}>

        <h2>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
        />

        {error && <p className="error-text">{error}</p>}

        <button type="submit">Login</button>

        <p className="auth-footer">
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")}>Signup</span>
        </p>

      </form>
    </div>
  );
};

export default Login;
