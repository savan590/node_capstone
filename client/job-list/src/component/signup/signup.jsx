import { useState } from "react";
import styles from "./signup.module.css";
import { useNavigate } from "react-router-dom";
import Backend_api from "../../config";

function RegisterForm() {
    const navigate = useNavigate();
  const [check,setcheck] = useState(false);
  const [data, setData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!data.name || !data.mobile || !data.email || !data.password || check===false) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(`${Backend_api}api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log(responseData);

      // Store user data in local storage (you may want to secure this in a real app)
      localStorage.setItem("user", responseData.user);
      localStorage.setItem("name", responseData.name);
      localStorage.setItem("token", responseData.jwttoken);

        navigate("/listing");

    } catch (error) {
      console.error("There was a problem with the request:", error);
      alert("There was a problem with the request, please try again");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Create an account</h1>
      <h2 className={styles.h2}>Your personal job finder is here</h2>
      <input
        className={styles.input}
        name="name"
        value={data.name}
        onChange={handleChange}
        type="text"
        placeholder="Name"
      />
      <input
        className={styles.input}
        name="email"
        value={data.email}
        onChange={handleChange}
        type="email"
        placeholder="Email"
      />
      <input
        className={styles.input}
        name="mobile"
        value={data.mobile}
        onChange={handleChange}
        type="tel"
        placeholder="Mobile"
      />
      <input
        className={styles.input}
        name="password"
        value={data.password}
        onChange={handleChange}
        type="password"
        placeholder="Password"
      />
      <div className={styles.check}>
        <label><input type="checkbox" onChange={(e) => setcheck(e.target.checked)}/>By creating an account, I agree to our terms of use and privacy policy
        </label></div>
      <button onClick={handleSubmit} className={styles.button}>
        Create Account
      </button>
      <p>
        Already have an account?
        <span onClick={()=>navigate("/login")} className={styles.underline}>Sign in</span>
      </p>
    </div>
  );
};

export default RegisterForm;
