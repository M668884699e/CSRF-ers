// src/components/MessagePage/ProfileBar/EditProfileModal/EditProfileModal.js

// import react
import { useState } from "react";

// import react-redux
import { useDispatch } from "react-redux";

// import store
import * as sessionActions from '../../../../store/session';

//? Edit Profile Modal component
const EditProfileModal = ({ setShowEditProfileModal }) => {

  /**
   * Controlled Inputs
   */
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editUserName, setEditUserName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editProfileImage, setEditProfileImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  // invoke dispatch
  const dispatch = useDispatch();

  // function to handle profile editing
  const onEditProfile = async e => {
    // prevent page from refreshing
    e.preventDefault();

    // const data = await dispatch
    setImageLoading(true);

    // form userinfo to give to edit user
    const userInfo = {
      first_name: editFirstName,
      last_name: editLastName,
      username: editUserName,
      email: editEmail,
      profile_image: editProfileImage
    };

    // call on thunk to edit user
    dispatch(sessionActions.thunkEditUser(userInfo))
      .then(_ => {
        setImageLoading(false);
      }).catch(async res => { 
        //! TODO: Catch Errors properly
        // parse res to data json
        // const data = await res.json();

        // if(data.errors) setValidationErrors()

        console.log("error", res);
      })
  }

  // function to update first name
  const updateEditFirstName = e => {
    setEditFirstName(e.target.value);
  }
  
  // function to update last name
  const updateEditLastName = e => {
    setEditLastName(e.target.value);
  }

  // function to update username
  const updateEditUsername = e => {
    setEditUserName(e.target.value);
  }  

  // function to update email
  const updateEditEmail = e => {
    setEditEmail(e.target.value);
  }

  // function to update file
  const updateImage = e => {
    const file = e.target.files[0];
    if (file) setEditProfileImage(file);
  }

  return (
    <section id="epm-container">
      <h2>
        Edit your profile
      </h2>
      {/* Edit Profile Modal */}
      <form onSubmit={onEditProfile} className="epm-form">
        {/* Edit First Name */}
        <input
          placeholder="First Name"
          value={editFirstName}
          onChange={updateEditFirstName}
        />

        {/* Edit Last Name */}
        <input
          placeholder="Last Name"
          value={editLastName}
          onChange={updateEditLastName}
        />
        
        {/* Edit Username */}
        <input
          placeholder="Username"
          value={editUserName}
          onChange={updateEditUsername}
        />
        
        {/* Edit Email */}
        <input
          placeholder="Email"
          value={editEmail}
          onChange={updateEditEmail}
        />
        
        {/* Edit Profile Picture */}
        <input
          type="file"
          accept="image/*"
          onChange={updateImage}
        />
        
        {/* Submit Button */}
        <button
          type="submit"
        >
          Edit Current User
        </button>
        {(imageLoading)&&<p>Loading...</p>}
      </form>
    </section>
  );
}

// export component
export default EditProfileModal;
