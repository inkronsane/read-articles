import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyCode = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const params = new URLSearchParams(location.search);
  const username = params.get("username");
  const email = params.get("email");
  const password = params.get("password");

  useEffect(() => {
    const sendInitialRequest = async () => {
      try {
        // Відправка POST-запиту на реєстрацію без очікування відповіді
        await fetch("https://ras02-eas-14.azuremicroservices.io/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ dto: { username, email, password } }),
        });
        setIsLoaded(true);
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred");
      }
    };

    sendInitialRequest();
  }, [username, email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Відправка POST-запиту для перевірки коду разом із інформацією про код
      const verificationResponse = await fetch(
        "https://ras02-eas-14.azuremicroservices.io/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code, dto: { username, email, password } }),
        }
      );

      if (verificationResponse.ok) {
        // Якщо код перевірки правильний, переходимо на головну сторінку
        navigate("/");
      } else {
        alert("Incorrect verification code");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    }
  };

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  return (
    <div className="verify-code-page">
      <h2>Enter Verification Code</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="verification-code">Verification Code:</label>
        <input
          type="text"
          id="verification-code"
          placeholder="Enter verification code"
          value={code}
          onChange={handleChange}
          maxLength="6"
          minLength="6"
          required
        />
        <button type="submit" disabled={!isLoaded}>
          Verify
        </button>
      </form>
    </div>
  );
};

export default VerifyCode;
