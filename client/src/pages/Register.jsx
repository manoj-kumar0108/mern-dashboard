import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

function Register() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();

  const { storeTokenInLS } = useAuth();

  const [loading, setLoading] = useState(false); // Added loading state
  const [error, setError] = useState(""); // Added error state

  // Handle input changes
  const handleInput = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      // console.log("response data : ", response);
      const responseData = await response.json();
      console.log("res from server", responseData.extraDetails);
      if (response.ok) {
      
        // toast("registration successful");
        storeTokenInLS(responseData.token);
        setUser({ username: "", email: "", phone: "", password: "" });
        toast.success("Registration sucessful");
        navigate("/login");
        console.log(responseData);
      } else {
        // console.log("error inside response ", error);
        toast.error(responseData.extraDetails ? responseData.extraDetails : responseData.message);
      }
    } catch (error) {
      console.log("register", error);
    }
  };

  return (
    <section
      
    >
      <main>
        <div
         
        >
          <h1
           
          >
            Registration Form
          </h1>
          {error && (
            <div
              
            >
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "15px" }}>
              <label
                htmlFor="username"
               
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleInput}
                placeholder="Enter your username"
                required
                
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label
                htmlFor="email"
               
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInput}
                placeholder="Enter your email"
                required
               
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label
                htmlFor="phone"
                
              >
                Phone
              </label>
              <input
                type="number"
                name="phone"
                value={user.phone}
                onChange={handleInput}
                placeholder="Enter your phone number"
                required
               
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="password"
               
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleInput}
                placeholder="Enter your password"
                required
                
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              
            >
              {loading ? "Registering..." : "Register Now"}
            </button>
          </form>
        </div>
      </main>
    </section>
  );
}

export default Register;
