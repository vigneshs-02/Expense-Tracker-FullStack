import Signup from "../components/auth/Signup";
import "../styles/auth.css";

const SignupPage = () => {
  return (
    <div className="auth-layout">

      <div className="auth-right">
        <Signup />
      </div>

    </div>
  );
};

export default SignupPage;
