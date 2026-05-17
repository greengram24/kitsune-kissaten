import { useState } from "react";
import { Link } from "react-router";
import Navbar from "../components/Navbar";
import api from "../lib/axios";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await api.post("/auth/login", {
          email: formData.email,
          password: formData.password,
        });
        if (rememberMe) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data));
        } else {
          sessionStorage.setItem("token", res.data.token);
          sessionStorage.setItem("user", JSON.stringify(res.data));
        }
        toast.success("Login successful!");
        window.location.href = "/";
      } else {
        await api.post("/auth/register", {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: "customer",
        });
        toast.success("Registration successful! Please login.");
        setIsLogin(true);
        setFormData({ ...formData, password: "" });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Authentication failed");
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-md mx-auto p-4 mt-12">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-primary text-3xl justify-center">
              {isLogin ? "Login" : "Register"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              {!isLogin && (
                <div>
                  <label className="label">
                    <span className="label-text">Username</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    required={!isLogin}
                  />
                </div>
              )}
              <div>
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  className="input input-bordered w-full"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </div>
              {isLogin && (
                <div className="flex items-center justify-between gap-4">
                  <label className="cursor-pointer label gap-2">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span className="label-text">Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => setShowForgotPassword(true)}
                  >
                    Forgot password?
                  </button>
                </div>
              )}
              <button type="submit" className="btn btn-primary w-full">
                {isLogin ? "Login" : "Register"}
              </button>
            </form>
            {showForgotPassword ? (
              <div className="mt-6 border-t pt-6">
                <h3 className="text-lg font-semibold text-primary mb-4">
                  Forgot Password
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className="input input-bordered w-full"
                      placeholder="Enter your email"
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary w-full"
                    onClick={async () => {
                      if (!forgotEmail.trim()) {
                        toast.error("Please enter your email.");
                        return;
                      }

                      try {
                        const res = await api.post("/auth/forgot-password", {
                          email: forgotEmail.trim(),
                        });
                        setForgotMessage(res.data.message);
                      } catch (error) {
                        toast.error(
                          error.response?.data?.message ||
                            error.message ||
                            "Unable to process request"
                        );
                      }
                    }}
                  >
                    Send Reset Link
                  </button>
                  {forgotMessage && (
                    <p className="text-sm text-success">{forgotMessage}</p>
                  )}
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => setShowForgotPassword(false)}
                  >
                    Back to login
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center mt-4">
                <button
                  className="btn btn-link"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin
                    ? "Don't have an account? Register"
                    : "Already have an account? Login"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;