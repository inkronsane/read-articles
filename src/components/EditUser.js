import React, { useState } from "react";

const EditUser = ({ user, onUpdate }) => {
  const [firstName, setFirstName] = useState(
    user.personalInfo ? user.personalInfo.firstName : ""
  );
  const [lastName, setLastName] = useState(
    user.personalInfo ? user.personalInfo.lastName : ""
  );
  const [birthDate, setBirthDate] = useState(
    user.personalInfo ? user.personalInfo.birthDate : ""
  );
  const [info, setInfo] = useState(
    user.personalInfo ? user.personalInfo.info : ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({
      ...user,
      personalInfo: {
        firstName: firstName,
        lastName: lastName,
        birthDate: birthDate,
        info: info,
      },
    });
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleBirthDateChange = (e) => {
    setBirthDate(e.target.value);
  };

  const handleInfoChange = (e) => {
    setInfo(e.target.value);
  };

  return (
    <div className="edit-user">
      <h2>Edit User Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={handleFirstNameChange}
          required
        />
        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={handleLastNameChange}
          required
        />
        <label>Birth Date:</label>
        <input
          type="date"
          value={birthDate}
          onChange={handleBirthDateChange}
          required
        />
        <label>Info:</label>
        <textarea value={info} onChange={handleInfoChange} required></textarea>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditUser;
