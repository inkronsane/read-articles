// UserProfilePage.js
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "./data/useFetch";
import EditUser from "./EditUser";
import Cookies from "js-cookie";

const UserProfilePage = () => {
  const { userId } = useParams();
  const {
    data: dto,
    isPending,
    error,
    refetch: refetchUser,
  } = useFetch(`https://ras02-eas-14.azuremicroservices.io/users/${userId}`);

  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateUser = (updatedUser) => {
    const token = Cookies.get("jwt");
    fetch(`https://ras02-eas-14.azuremicroservices.io/users/update`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dto: updatedUser }),
    })
      .then(() => {
        setIsEditing(false);
        refetchUser();
        navigator("/");
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <p>Username: {dto.dto.username}</p>
      <p>Email: {dto.dto.email}</p>
      <p>Role: {dto.dto.role}</p>
      <div>
        <h3>Personal Information</h3>
        {dto.dto.personalInfo ? (
          <>
            <p>First Name: {dto.dto.personalInfo.firstName}</p>
            <p>Last Name: {dto.dto.personalInfo.lastName}</p>
            <p>Birth Date: {dto.dto.personalInfo.birthDate}</p>
            <p>Info: {dto.dto.personalInfo.info}</p>
          </>
        ) : (
          <p>No personal information available</p>
        )}
      </div>
      <button
        className="edit-profile-button"
        onClick={() => setIsEditing(true)}
      >
        Edit Profile
      </button>
      {isEditing && <EditUser user={dto.dto} onUpdate={handleUpdateUser} />}
    </div>
  );
};

export default UserProfilePage;
