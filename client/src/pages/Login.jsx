import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/Navbar.css";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { storeTokenInLS } = useAuth();

  const navigate = useNavigate();

  // Handle input field value
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  // let handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const responseData = await response.json();

      if (response.ok) {
        // toast("login sucessful");

        console.log("after login: ", responseData);
        // toast.success("Registration Successful");
        storeTokenInLS(responseData.token);
        toast.success("Login Sucessful");
        navigate("/");
      } else {
        toast.error(
          responseData.extraDetails
            ? responseData.extraDetails
            : responseData.message
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container">
              {/* Main login form */}
              <h1 className="main-heading">Login Form</h1>
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    name="email"
                    value={user.email}
                    onChange={handleInput}
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleInput}
                    placeholder="Enter your password"
                  />
                </div>
                <button type="submit" className="btn btn-submit">
                  Login
                </button>
              </form>
            </div>
          </div>
        </main>
      </section>
    </>
  );
}

export default Login;
