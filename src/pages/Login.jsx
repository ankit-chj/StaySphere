import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const destination = location.state?.from || "/";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function handleLogin(event) {
        event.preventDefault();

        setError("")

        const cleanedEmail = email
         .trim()
         .toLowerCase()

        if (!cleanedEmail || !password) {
            setError(
                "Please enter your email and Password."
            );
            return;
        }

        const registeredUsers = JSON.parse(
            localStorage.getItem("staysphereUsers") || "[]"
        );

        const matchingUser = registeredUsers.find(
            (user) =>
                user.email === cleanedEmail &&
                user.password === password
        );

        if (!matchingUser) {
            setError(
                "The email or password you entered is incorrect."
            );
            return;
        }

        const currentUser = {
          id: matchingUser.id,
          fullName: matchingUser.fullName,
          email: matchingUser.email,
        };

        localStorage.setItem("staysphereCurrentUser",
           JSON.stringify(currentUser) 
        );

        navigate(destination, {
          replace: true,
        });

    }
    return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-heading">
          <p className="auth-label">
            Welcome Back
          </p>

          <h1>Log in to StaySphere</h1>

          <p>
            Access your account and manage your
            bookings.
          </p>
        </div>

        <form
          className="auth-form"
          onSubmit={handleLogin}
        >
          <label htmlFor="loginEmail">
            Email Address
          </label>

          <input
            type="email"
            id="loginEmail"
            placeholder="Enter your email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
          />

          <label htmlFor="loginPassword">
            Password
          </label>

          <input
            type="password"
            id="loginPassword"
            placeholder="Enter your password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
          />

          {error && (
            <p className="auth-message error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="auth-submit-button"
          >
            Log In
          </button>
        </form>

        <p className="auth-switch">
          Do not have an account?{" "}
          <Link to="/register">
            Create one
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Login;


    
