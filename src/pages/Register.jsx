import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleRegister(event) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const cleanedName = fullName.trim();
    const cleanedEmail = email
      .trim()
      .toLowerCase();

    if (
      !cleanedName ||
      !cleanedEmail ||
      !password ||
      !confirmPassword
    ) {
      setError("Please complete all fields.");
      return;
    }

    if (!cleanedEmail.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const existingUsers = JSON.parse(
      localStorage.getItem("staysphereUsers") ||
        "[]"
    );

    const emailAlreadyExists = existingUsers.some(
      (user) => user.email === cleanedEmail
    );

    if (emailAlreadyExists) {
      setError(
        "An account with this email already exists."
      );
      return;
    }

    const newUser = {
      id: `USER-${Date.now()}`,
      fullName: cleanedName,
      email: cleanedEmail,
      password,
      createdAt: new Date().toISOString(),
    };

    const updatedUsers = [
      ...existingUsers,
      newUser,
    ];

    localStorage.setItem(
      "staysphereUsers",
      JSON.stringify(updatedUsers)
    );

    setSuccess(
      "Your account has been created successfully."
    );

    setFullName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    setTimeout(() => {
      navigate("/login");
    }, 1200);
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-heading">
          <p className="auth-label">
            Join StaySphere
          </p>

          <h1>Create your account</h1>

          <p>
            Register to manage your stays and
            bookings.
          </p>
        </div>

        <form
          className="auth-form"
          onSubmit={handleRegister}
        >
          <label htmlFor="fullName">
            Full Name
          </label>

          <input
            type="text"
            id="fullName"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(event) =>
              setFullName(event.target.value)
            }
          />

          <label htmlFor="registerEmail">
            Email Address
          </label>

          <input
            type="email"
            id="registerEmail"
            placeholder="Enter your email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
          />

          <label htmlFor="registerPassword">
            Password
          </label>

          <input
            type="password"
            id="registerPassword"
            placeholder="Minimum 6 characters"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
          />

          <label htmlFor="confirmPassword">
            Confirm Password
          </label>

          <input
            type="password"
            id="confirmPassword"
            placeholder="Enter your password again"
            value={confirmPassword}
            onChange={(event) =>
              setConfirmPassword(
                event.target.value
              )
            }
          />

          {error && (
            <p className="auth-message error">
              {error}
            </p>
          )}

          {success && (
            <p className="auth-message success">
              {success}
            </p>
          )}

          <button
            type="submit"
            className="auth-submit-button"
          >
            Create Account
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <Link to="/login">
            Log in
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Register;