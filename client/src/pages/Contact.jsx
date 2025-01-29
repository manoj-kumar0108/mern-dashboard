import { useState, useEffect } from "react";
import { useAuth } from "../store/auth";

const defaultContactFormData = { username: "", email: "", message: "" };

const Contact = () => {
  const [data, setData] = useState(defaultContactFormData);
  const { user } = useAuth();
  console.log("frontend user ", user.email);

  const [userData, setUserData] = useState(true);
  


  if (userData && user) {
    setData({
      username: user.username,
      email: user.email,
      message: "",
    });
    setUserData(false);
  }

  const handleInput = (e) => {
    // console.log(e);
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/form/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log("response: ", response);
      alert("Message sent sucessfully");

      if (response.ok) {
        setData(defaultContactFormData);
        const responseData = await response.json();
        // alert(responseData);
        console.log(responseData);
      } else {
        // Handle API error here
        console.error("API Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
    <section className="section-contact">
      <div className="contact-content container">
        <h1 className="main-heading">contact us</h1>
      </div>
      {/* <h1>Contact Page</h1> */}
      <div className="container grid grid-half-cols">
        <div className="contact-img">
          <img src="/images/support.png" alt="always ready to help you" />
        </div>

        <section className="section-form">
          <form onSubmit={handleContactForm}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                value={data.username}
                onChange={handleInput}
                autoCapitalize="off"
                required
              />
            </div>

            <div>
                <label htmlFor="email">email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={data.email}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="message">message</label>
                <textarea
                  name="message"
                  id="message"
                  autoComplete="off"
                  value={data.message}
                  onChange={handleInput}
                  required
                  cols="30"
                  rows="6"
                ></textarea>
              </div>


           
            <div>
              <button type="submit"> Submit </button>
            </div>
          </form>
        </section>
      </div>
    </section>
  </>
  );
};

export default Contact;
