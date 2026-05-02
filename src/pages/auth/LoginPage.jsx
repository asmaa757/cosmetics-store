import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import logoImg from "../../assets/logo.jpg";
import "./LoginPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await login(username, password);
      if (response.success) {
        toast.success(response.message);

        if (response.user.role === "cashier") {
          navigate("/pos");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignInClick = () => {
    window.location.href = "/login";
  };

  return (
    <div className="login-page">
      {/* Navbar */}
      <div className="login-navbar">
        <div className="login-logo">
            <div className="login-logo-icon">
              <img src={logoImg} alt="logo" />
            </div>
            <span className="login-logo-text">Riza Store</span>
          </div>

        <div className="login-datetime">
          <span className="login-time">{formatTime(currentTime)}</span>
          <span className="login-date">{formatDate(currentTime)}</span>
        </div>

        <button className="login-signin-btn" onClick={handleSignInClick}>
          <span className="login-signin-icon">
            <svg
              viewBox="0 0 16 18"
              width="20"
              height="19"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="8"
                cy="5"
                r="3.5"
                stroke="#FF2056"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M1 16c0-3.866 3.134-7 7-7s7 3.134 7 7"
                stroke="#FF2056"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </span>
          <span className="login-signin-label">Sign In</span>
          <span className="login-chevron">
            <svg
              viewBox="0 0 12 6"
              width="12"
              height="6"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1l5 4 5-4"
                stroke="#4C4949"
                strokeWidth="1"
                fill="none"
              />
            </svg>
          </span>
        </button>
      </div>

      {/* Body */}
      <div className="login-page-body">
        <div className="login-form-card">
          <div className="login-form-header">
            <div className="login-form-logo-icon">
              <img src={logoImg} alt="logo" />
            </div>
            <h1 className="login-form-title">LogIn</h1>
            <p className="login-form-subtitle">Sign In to your account</p>
          </div><form onSubmit={handleSubmit} className="login-fields-wrapper">
            <div className="login-field-group">
              <label className="login-field-label">Username</label>
              <div className="login-input-wrap">
                <span className="login-input-icon">
                  <svg width="15" height="15" viewBox="0 0 15 15">
                    <circle
                      cx="7.5"
                      cy="4.5"
                      r="3"
                      stroke="#FF2056"
                      strokeWidth="1.5"
                      fill="none"
                    />
                    <path
                      d="M1 14c0-3.314 2.91-6 6.5-6S14 10.686 14 14"
                      stroke="#FF2056"
                      strokeWidth="1.5"
                      fill="none"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="login-field-group">
              <label className="login-field-label">Password</label>
              <div className="login-input-wrap">
                <span className="login-input-icon">
                  <svg width="15" height="15" viewBox="0 0 15 15">
                    <rect
                      x="2"
                      y="7"
                      width="11"
                      height="7"
                      rx="1.5"
                      stroke="#FF2056"
                      strokeWidth="1.5"
                      fill="none"
                    />
                    <path
                      d="M4.5 7V5a3 3 0 016 0v2"
                      stroke="#FF2056"
                      strokeWidth="1.5"
                      fill="none"
                    />
                    <circle cx="7.5" cy="10.5" r="1" fill="#FF2056" />
                  </svg>
                </span>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="login-login-btn"
              disabled={loading}
            >
              {loading ? "Logging in..." : "LogIn"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;